import IdeaCard from "../../components/ideaCard"
import { GetServerSideProps } from "next"
import React from "react"
import MainLayout from "../../layouts/mainLayout"
import FauxAPI from "../../APIConsumer"
import { Comment, Idea } from "../../APIConsumer/ideas/types"
import InputBar from "../../components/inputBar"
import Alert from "../../components/alert"
import { UserContext } from "../../contexts/UserContext"
import CommentCard from "../../components/comment"
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from "react-icons/bs"
import Loader from "../../components/loader"

interface IdeaProps {
    ideaId: string,
    similars: Idea[]
}

const Idea: React.FC<IdeaProps> = ({ similars, ideaId }) => {
    const {state, dispatch} = React.useContext(UserContext)
    const [comment, setComment] = React.useState("")
    const [idea, setIdea] = React.useState<Idea>()
    React.useEffect(() => {
        const api = new FauxAPI()
        api.ideas().getIdea(ideaId).then(idea => setIdea(idea))
    }, [ideaId])

    const handleAddComment = () => {
        if(!state.user || !idea) return
        const api = new FauxAPI()
        api.ideas({
            jwt: state.user.jwt
        }).createComment({
            comment: comment,
            ideaId: idea.id,
            userId: String(state.user.id)
        }).then((newComment: Comment) => {
            setComment("")
            setIdea({...idea, comments: [...idea.comments, newComment]})
        })
    }
    const handleVote = (type: "UP" | "DOWN") => {
        if(!state.user || !idea) return
        const api = new FauxAPI()
        api.ideas({
            jwt: state.user.jwt
        }).voteIdea({
            ideaId: idea.id,
            downvotes: type === "DOWN" ? idea.downvotes + 1 : idea.downvotes,
            upvotes: type === "UP" ? idea.upvotes + 1 : idea.upvotes
        }).then(() => {
            setIdea({
                ...idea,
                upvotes: type === "UP" ? idea.upvotes + 1 : idea.upvotes,
                downvotes: type === "DOWN" ? idea.downvotes + 1 : idea.downvotes,
            })
        })
    }
    if (!idea) return <Loader />
    return (
        <MainLayout>
            <div className="bg-primary-background min-h-screen pb-8">
                <div className="container mx-auto p-4 lg:p-0">
                    <div className=" flex space-x-6 pt-6 items-center">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-white">{idea.upvotes} </div>
                                <BsFillArrowUpCircleFill size={24} className="text-primary-button mb-1" onClick={() => handleVote("UP")}/> 
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <BsFillArrowDownCircleFill size={24} className="text-red-500 mt-1" onClick={() => handleVote("DOWN")}/> 
                                <div className="text-white">{idea.downvotes} </div>
                            </div>
                        </div>
                        <div className="text-4xl text-primary-button  mb-2 font-bold">{idea.title}</div>
                    </div>
                    <div className="text-white text-xl flex space-x-4 font-bold"> {idea.author.username} | {idea.createdAt.split('T')[0]} </div>

                    <div className="my-4 text-white text-lg">
                        {idea.body}
                    </div>

                    <div className="text-3xl font-bold text-primary-button my-4">Comments</div>
                    <div className="my-4 flex space-x-4 items-center text-white">
                        <InputBar placeholder="Add Comment" value={comment} onChange={(e) => setComment((e.target as HTMLInputElement).value)} />
                        <div className="p-3  bg-primary-button text-primary-background font-bold rounded-md" onClick={handleAddComment}>Comment</div>
                    </div>
                    {
                        idea.comments.length === 0 && <Alert message={"No comments yet"} type={"success"} />
                    }
                    {
                        idea.comments.map(comment => <div key={comment.id}><CommentCard fetchedComment={comment} /></div>)
                    }
                    <div className="text-4xl text-primary-button font-bold my-4">Similar</div>
                    <div className="lg:flex">
                        {
                            similars.map(_idea => {
                                return (
                                    <div className="mr-4 w-full my-4 lg:w-1/4" key={_idea.id}>
                                        <IdeaCard
                                            id={_idea.id}
                                            title={_idea.title}
                                            description={_idea.body.slice(0, 25)}
                                            author={_idea.author.username}
                                            upvotes={_idea.upvotes}
                                            downvotes={_idea.downvotes}
                                        />
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>

            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const api = new FauxAPI()
    if (typeof query.id !== 'string') 
        return {
            props: {
                title: "Wrong id",
            }
        }
    
    const ideas = await api.ideas().getIdeas(0, 2)
    
    
    return {
        props: {
            ideaId: query.id,
            similars: ideas
        }
    }
}

export default Idea