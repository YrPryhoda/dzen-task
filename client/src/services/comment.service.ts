import { errorService } from "./error.service";
import {
  CommentInterface,
  CommentSortOptions,
  CreateCommentInterface
} from "../types/comment.interfaces";

class CommentService {
  private readonly url = `${process.env.REACT_APP_WEB_URL}/api/comment`;

  async fetchComments({
    direction,
    skip,
    sortField
  }: Partial<CommentSortOptions>): Promise<{
    comments: CommentInterface[];
    count: number;
  }> {
    let endpoint = `${this.url}?`;

    if (skip) {
      endpoint += `skip=${skip}`;
    }

    if (sortField) {
      endpoint += `&sortField=${sortField}`;
    }

    if (direction) {
      endpoint += `&direction=${direction}`;
    }

    const response = await fetch(endpoint);
    errorService.checkResponse(response);

    return await response.json();
  }

  async fetchComment(id: string): Promise<CommentInterface> {
    const endpoint = `${this.url}/${id}`;

    const response = await fetch(endpoint);
    errorService.checkResponse(response);

    return await response.json();
  }

  async createComment(
    comment: CreateCommentInterface
  ): Promise<CommentInterface> {
    const body = new FormData();
    Object.entries(comment).forEach(([key, value]) => {
      body.append(key, value);
    });

    const response = await fetch(`${this.url}/create`, {
      method: "POST",
      body
    });
    errorService.checkResponse(response);

    return await response.json();
  }
}

export const commentService = new CommentService();
