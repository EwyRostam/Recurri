import { Link, useLocation } from "react-router-dom"
import CreateTemplate, { Template } from "./CreateTemplate/CreateTemplate"
import Overview from "./Overview/Overview"
import { useState } from "react";

function Home() {
  const location = useLocation();
  const { pathname } = location;
  const [templates, setTemplates] = useState<Template[]>([])
  const pathArray = pathname.split("/")
  
  return (

    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden h-8" >Open drawer</label>

        <div className="pl-4 text-sm breadcrumbs h-12">
          <ul>
            {pathArray.length > 2 && pathArray.slice(1).map((name,index) => {
              const path = `/${pathArray.slice(1, index + 2).join('/')}`;
              if(index == pathArray.length-1){
                return <li key={name+index}>{name}</li>
              }
              return <li key={name+index}><Link to={path}>{name}</Link></li>
              
            })}

          </ul>
        </div>
        
        {pathname == "/home" ? <Overview templates={templates} /> : <CreateTemplate setTemplates={setTemplates} />}

      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
          {/* Sidebar content here */}
          <li><h1 className="text-2xl">Recurri</h1></li>
          <li><Link to={"/home"}>Home</Link></li>
          <li><Link to={"/home/createtemplate"}>Create template</Link></li>
          <li><Link to={"/aboutus"}>About us</Link></li>
        </ul>
      </div>
    </div>

  )
}

export default Home