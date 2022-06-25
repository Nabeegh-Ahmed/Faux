import { request } from "../Tranport Layer";
import { Idea, Comment, Reply, CreateIdeaPayload, CreateCommentPayload, CreateReplyPayload, VoteIdeaPayload } from "./types";
import { defaultTransportParams, TransportParams } from "../Tranport Layer/types";
import { errorHandler } from "../Tranport Layer/errorHandler";
import { createComment, createIdea, createReply, getIdea, getIdeas, handleVoteIdea } from "./queries";

class Ideas {
    private route = '/trade'
    private transportParams: TransportParams = defaultTransportParams
    async createIdea(data: CreateIdeaPayload): Promise<Idea> {
        try {
            if (this.transportParams.jwt === '') throw new Error('No JWT provided')
            const res = await request({
                gql: createIdea,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                    ...this.transportParams.headers
                },
                method: 'MUTATION',
                variables: { ...data }
            })
            console.log(res.data.createIdea)
            return {
                id: res.data.createIdea.data.id,
                title: data.title,
                tags: data.tags,
                body: data.body,
                createdAt: new Date().toISOString(),
                upvotes: 0,
                downvotes: 0,
                comments: [],
                author: {
                    id: res.data.createIdea.data.attributes.users_permissions_user.data.id,
                    username: res.data.createIdea.data.attributes.users_permissions_user.data.attributes.username
                }
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async createComment(data: CreateCommentPayload): Promise<Comment> {
        try {
            if (this.transportParams.jwt === '') throw new Error('No JWT provided')
            const res = await request({
                gql: createComment,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                },
                method: 'MUTATION',
                variables: { ...data }
            })
            
            return {
                id: res.data.createComment.data.id,
                comment: data.comment,
                username: res.data.createComment.data.attributes.users_permissions_user.data.attributes.username,
                replies: []
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async createReply(data: CreateReplyPayload): Promise<Reply> {
        try {
            if (this.transportParams.jwt === '') throw new Error('No JWT provided')
            const res = await request({
                gql: createReply,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                },
                method: 'MUTATION',
                variables: { ...data }
            })
            console.log(res.data.createReply)
            return {
                id: res.data.createReply.data.id,
                reply: data.reply,
                username: res.data.createReply.data.attributes.users_permissions_user.data.attributes.username
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async getIdea(id: string): Promise<Idea> {
        try {
            const res = await request({
                gql: getIdea,
                headers: {},
                method: 'QUERY',
                variables: { id }
            })
            return {
                id: res.data.idea.data.id,
                title: res.data.idea.data.attributes.title,
                tags: res.data.idea.data.attributes.tags,
                body: res.data.idea.data.attributes.body,
                createdAt: res.data.idea.data.attributes.createdAt,
                upvotes: res.data.idea.data.attributes.upvotes,
                downvotes: res.data.idea.data.attributes.downvotes,
                author: {
                    id: res.data.idea.data.attributes.users_permissions_user.data.id,
                    username: res.data.idea.data.attributes.users_permissions_user.data.attributes.username
                },
                comments: res.data.idea.data.attributes.comments.data.map((comment: any) => {
                    return {
                        id: comment.id,
                        comment: comment.attributes.comment,
                        username: comment.attributes.users_permissions_user.data.attributes.username,
                        replies: comment.attributes.replies.data.map((reply: any) => {
                            return {
                                id: reply.id,
                                reply: reply.attributes.reply,
                                username: reply.attributes.users_permissions_user.data.attributes.username
                            }
                        })
                    }
                }),
            }
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async getIdeas(page: number, pageSize: number): Promise<Idea[]> {
        try {
            const res = await request({
                gql: getIdeas,
                headers: {},
                method: 'QUERY',
                variables: { page, pageSize }
            })
            return res.data.ideas.data.map((idea: any) => {
                
                return {
                    id: idea.id,
                    title: idea.attributes.title,
                    tags: idea.attributes.tags,
                    body: idea.attributes.body,
                    createdAt: idea.attributes.createdAt,
                    upvotes: idea.attributes.upvotes,
                    downvotes: idea.attributes.downvotes,
                    author: {
                        id: idea.attributes.users_permissions_user.data.id,
                        username: idea.attributes.users_permissions_user.data.attributes.username
                    }
                }
            })
        } catch (error) {
            throw new Error(errorHandler(error).message)
        }
    }
    async voteIdea(votePayload: VoteIdeaPayload) {
        try {
            await request({
                gql: handleVoteIdea,
                headers: {
                    "Authorization": `Bearer ${this.transportParams.jwt}`,
                },
                method: 'MUTATION',
                variables: { ...votePayload }
            })
            
        } catch(error) {
            throw new Error(errorHandler(error).message)
        }
    }
    setTransportParams(transportParams: TransportParams) {
        if (this.transportParams.jwt === '') this.transportParams.jwt = transportParams.jwt
        else this.transportParams = transportParams
    }
}

export default Ideas