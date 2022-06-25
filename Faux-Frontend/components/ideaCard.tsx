import Link from "next/link"
import { Router, useRouter } from "next/router"
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill} from "react-icons/bs"
interface IdeaCardProps {
    title: string,
    description: string,
    author: string,
    id: string,
    upvotes: number,
    downvotes: number,
}

const IdeaCard: React.FC<IdeaCardProps> = ({ id, title, description, author, upvotes, downvotes }) => {
    const router = useRouter()
    return (
        <div  onClick={() => router.push(`/ideas/${id}`)} >
            <div className="p-4 rounded-lg border-2 border-white bg-primary-background">
                <div className="text-3xl text-primary-button">{title}</div>
                <div className="text-lg text-white">{description}...</div>
                <div className="text-md text-white my-2 italic">By. {author} </div>
                <div className="flex space-x-4 my-4">
                    <div className="flex flex-row text-xl text-white items-center space-x-2">
                        <div><BsFillArrowUpCircleFill size={24} className="text-primary-button" /></div>
                        <div>{upvotes}</div> 
                    </div>
                    <div className="flex flex-row text-xl text-white items-center space-x-2">
                        <BsFillArrowDownCircleFill size={24} className="text-red-500"/> 
                        <div>{downvotes}</div>
                    </div>
                </div>
                <div className="p-2 px-4 font-bold bg-primary-button text-center rounded-md my-2 text-primary-background uppercase">Read more</div>
            </div>
        </div>
    )
}

export default IdeaCard