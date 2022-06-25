import React from "react"
import FauxAPI from "../APIConsumer"
import { Comment } from "../APIConsumer/ideas/types"
import { UserContext } from "../contexts/UserContext"
import InputBar from "./inputBar"

interface CommentCardProps {
    fetchedComment: Comment
}

const CommentCard: React.FC<CommentCardProps> = ({ fetchedComment }) => {
    const { state } = React.useContext(UserContext)
    const [reply, setReply] = React.useState("")
    const [comment, setComment] = React.useState(fetchedComment)

    const handleReplyCreate = () => {
        if (!state.user) return
        const api = new FauxAPI()
        api.ideas({
            jwt: state.user.jwt
        }).createReply({
            commentId: comment.id,
            userId: String(state.user.id),
            reply: reply
        })
        .then(newReply => {
            setReply("")
            setComment({
                ...comment,
                replies: [...comment.replies, newReply]
            })
        })

    }
    return (
        <>
        <div className="my-4 text-white text-lg">
            <span className="text-2xl font-bold text-primary-button">{comment.username}: </span>
            {comment.comment}
            {
                comment.replies.length > 0 && <div className="ml-8">   
                {
                    comment.replies.map(reply => <div key={reply.id} className="flex space-x-1"><div className="font-bold text-primary-button">{reply.username}: </div> <div>{reply.reply}</div></div>)
                }
                </div>
            }
        </div>
        <div className="text-white  flex space-x-2 items-center"> 
            <div className="w-full lg:w-1/4">
                <InputBar placeholder="Reply" value={reply} onChange={(e) => setReply((e.target as HTMLInputElement).value)} />
            </div>
            <div className="p-3 bg-primary-button text-primary-background font-bold rounded-md" onClick={handleReplyCreate}>Reply</div>
        </div>
        </>
    )
}

export default CommentCard