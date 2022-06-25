import Header from "../components/header"

const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            <Header title="Template" links={[{name: "About", path: "/about"}]} />
        {children}
        </>
    )
}

export default MainLayout