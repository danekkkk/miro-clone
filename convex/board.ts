import { BOARD_PLACEHOLDER_IMAGES } from "./../constants/board-placeholder-images";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const randomImage =
      BOARD_PLACEHOLDER_IMAGES[
        Math.floor(Math.random() * BOARD_PLACEHOLDER_IMAGES.length)
      ];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});
