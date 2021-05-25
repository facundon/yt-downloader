import "./index.scss"

const Title = ({ text }: { text: string }) => {
   return (
      <div className="title">
         <h1>{text}</h1>
      </div>
   )
}

export default Title
