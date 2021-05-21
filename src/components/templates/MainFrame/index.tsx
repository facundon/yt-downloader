import "./index.scss"

type MainFrameProps = {
   title: React.ReactElement
   searchBar: React.ReactElement
   searchResults: React.ReactElement[]
}

const MainFrame: React.FC<MainFrameProps> = ({
   title,
   searchBar,
   searchResults,
}) => {
   return (
      <div className="container">
         <div className="header">
            {title}
            {searchBar}
         </div>
         <div className="search-results">{searchResults}</div>
      </div>
   )
}

export default MainFrame
