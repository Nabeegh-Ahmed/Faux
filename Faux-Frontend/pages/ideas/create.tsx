import Loader from "../../components/loader"
import React from "react"
import FauxAPI from "../../APIConsumer"
import InputBar from "../../components/inputBar"
import { UserContext } from "../../contexts/UserContext"
import MainLayout from "../../layouts/mainLayout"
import Alert from "../../components/alert"

const Create = () => {
    const {state} = React.useContext(UserContext)
    const [body, setBody] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")
    const [success, setSuccess] = React.useState("")

    const handleCreateIdea = () => {
        if (state.user && body && title) {
            setLoading(true)
            const api = new FauxAPI()
            api.ideas({jwt: state.user.jwt}).createIdea({
                body: body,
                title: title,
                userId: String(state.user.id),
                tags: ""
            })
            .then((idea: any) => {
                setLoading(false)
                setSuccess(`Idea created successfully`)
                setTitle("")
                setBody("")
            })
            .catch((err: any) => {
                setLoading(false)
                setError(err.message)
            })
        }
    }
    return (
        <MainLayout>
            <div className="bg-primary-background">
                <div className="container mx-auto h-screen p-4 lg:p-0">
                    <div className="text-4xl py-4 font-bold text-primary-button">Create a new Idea</div>
                    {
                        loading &&
                        <div className="flex justify-center">
                            <Loader />
                        </div>
                    }
                    {
                        error &&
                        <Alert message={error} type={"error"} />
                    }
                    {
                        success &&
                        <Alert message={success} type={"success"} />
                    }
                    <div className="text-2xl text-white my-2">Title</div>
                    <div className="text-white">
                        <InputBar 
                            placeholder="How to make $$$"    
                            value={title}
                            onChange={(e) => setTitle((e.target as HTMLInputElement).value)}
                        />
                    </div>

                    <div className="text-2xl text-white my-2">Idea</div>
                    <div className="text-white">
                        <textarea 
                            placeholder="Write your heart out"
                            rows={15}
                            className="w-full p-2 outline-none rounded-md bg-white bg-opacity-20"
                            style={{border: "1px solid gray"}}
                            value={body}
                            onChange={(e) => setBody((e.target as HTMLTextAreaElement).value)}
                        />
                    </div>

                    <div 
                        className="p-4 text-center font-bold bg-primary-button rounded-md my-4 text-primary-background uppercase cursor-pointer"
                        onClick={handleCreateIdea}
                    >
                        Publish
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Create