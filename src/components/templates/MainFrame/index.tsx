import "./index.scss"

type MainFrameProps = {
   title: React.ReactElement
   searchBar: React.ReactElement
}

const MainFrame: React.FC<MainFrameProps> = ({ title, searchBar }) => {
   return (
      <div className="container">
         <div className="header">
            {title}
            {searchBar}
         </div>
      </div>
   )
}

export default MainFrame
