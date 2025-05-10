import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const favoriteFilter = args.favorites as string;

    if (favoriteFilter) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoriteBoards.map((board) => board.boardId);

      const boards = await getAllOrThrow(ctx.db, ids as Id<"boards">[]);

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    const titleFilter = args.search as string;
    let boards = [];

    if (titleFilter) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", titleFilter).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boardWithFavoritesRelations = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite) => ({
          ...board,
          isFavorite: !!favorite,
        }));
    });

    const boardsWithFavoriteBoolean = await Promise.all(
      boardWithFavoritesRelations
    );

    return boardsWithFavoriteBoolean;
  },
});
