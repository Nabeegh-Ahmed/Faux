import MainLayout from "../../layouts/mainLayout"
import IdeaCard from "../../components/ideaCard"
import { GetServerSideProps, NextPage } from "next"
import FauxAPI from "../../APIConsumer"
import { Idea } from "../../APIConsumer/ideas/types"

interface IdeasProps {
    ideas: Idea[]
}

const Ideas: NextPage<IdeasProps> = ({ ideas }) => {
    return (
        <MainLayout>
            <div className="bg-primary-background min-h-screen">
                <div className="container mx-auto">
                    <div className="text-4xl text-white font-bold p-4">Discover Ideas</div>
                    <div className="border-2 border-white lg:w-full p-6 m-4 rounded-md">
                        <div className="text-3xl font-bold text-primary-button">Explore Ideas by other traders online, learn and earn</div>
                        <div className="text-lg text-white my-2">Our platform allows you to check out all the different ideas presented by other users! This is one of our most exciting features. Share your ideas with others and get their views on it!</div>
                        <div className="flex space-x-4 mt-4">
                            <div className="bg-white rounded-full p-3"></div>
                            <div className="bg-white rounded-full p-3"></div>
                            <div className="bg-white rounded-full p-3"></div>

                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 grid-cols-1">
                        {
                            ideas.map(idea => (
                                <div className="m-4" key={idea.id}>
                                    <IdeaCard
                                        id={idea.id}
                                        title={idea.title}
                                        description={idea.body.slice(0, 30)}
                                        author={idea.author.username}
                                        upvotes={idea.upvotes}
                                        downvotes={idea.downvotes}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const api = new FauxAPI()
    const ideas = await api.ideas().getIdeas(0, 10)
    return {
        props: {
            ideas
        }
    }

}

export default Ideas
