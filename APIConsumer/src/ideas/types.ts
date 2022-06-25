export interface Idea {
    id: string;
    title: string;
    tags: string;
    body: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    author: {
        id: string;
        username: string;
    };
    comments: Comment[];
}

export interface Reply {
    id: string;
    reply: string;
    username: string;
}

export interface Comment {
    id: string;
    comment: string;
    username: string;
    replies: Reply[];
}

export interface CreateIdeaPayload {
    title: string;
    tags: string;
    body: string;
    userId: string;
}

export interface CreateCommentPayload {
    ideaId: string;
    comment: string;
    userId: string;
}

export interface CreateReplyPayload {
    commentId: string;
    reply: string;
    userId: string;
}