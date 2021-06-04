import "./index.scss"

type MainFrameProps = {
   title: React.ReactElement
   searchBar: React.ReactElement
   searchResults: React.ReactElement[] | React.ReactElement
   options: React.ReactElement
   loading?: boolean
}

const MainFrame: React.FC<MainFrameProps> = ({
   title,
   searchBar,
   searchResults,
   options,
   loading,
}) => {
   return (
      <div className="container">
         <div className="top-bar">{options}</div>
         <div className="header">
            {title}
            {searchBar}
         </div>
         <div className="search-results">{searchResults}</div>
      </div>
   )
}

export default MainFrame
