import React from "react";
import { TbCircleTriangle } from 'react-icons/tb'
import { AiFillGithub } from 'react-icons/ai'

export default function Header(){
    return(
        <div className="h-14 flex items-center border-b px-16 border-slate-800 justify-between mt-1 relative">
            <div className="flex items-center p-2">
                <div className="text-blue mr-2 text-2xl animate-moebius">
                    <TbCircleTriangle />
                </div>
                <h1 className="text-dark text-xl font-medium">tolgazorlu</h1>
            </div>
            <div className="flex items-center">
                <a href="https://tailwindcss.com/" className="text-sm font-semibold text-dark">Tailwind</a>
                <a href="https://github.com/tolgazorlu/react-solidity-todo" className="text-sm font-semibold text-dark ml-8">Project</a>
                <a href="https://www.linkedin.com/in/tolgazorlu/" className="text-sm font-semibold text-dark ml-8">Linkedin</a>
                <a href="https://www.youtube.com/channel/UCbQ2CNMwWjNeRDaXoKi9eAA" className="text-sm font-semibold text-dark ml-8">Youtube <span className="text-xs text-blue bg-darkBlue rounded-xl px-2 py-1">New</span></a>
                <div className="h-6 w-0.5 bg-slate-800 ml-8"></div>
                <div className="text-gray text-2xl ml-8">
                <AiFillGithub />
                </div>
            </div>
        </div>
    )
}