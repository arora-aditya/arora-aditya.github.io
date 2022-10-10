
export default function removeCDATA(text: string | null){
  if(text){
    return text.replace("<![CDATA[", "").replace("]]>", "")
  }
  return ""
}