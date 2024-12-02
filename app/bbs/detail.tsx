import { useEffect,useState } from "react";
import Markdown from "~/components/MarkDown";


const BBSDetail=(props:any)=> {
    const {params:{id}} = props
    console.log("👍👍✌️✌️ ~ BBSDetail ~ props:", props)
    const [content,setContent] = useState('')
    useEffect(()=>{
        if(id){
            fetch(`/md/${id}.md`).then((resp)=>resp.text()).then((txt)=>setContent(txt))
        }
    },[id])
    
    return <Markdown content={content} />
}


export default BBSDetail