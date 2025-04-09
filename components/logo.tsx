import type React from "react"
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Logo: React.FC = () => {
  return (
    <div className="w-full">
      <pre className="ascii-shadow text-terminal-cyan text-[0.1rem] xs:text-[0.15rem] sm:text-[0.2rem] md:text-xs whitespace-pre overflow-x-auto">
        {`
        ██╗  ██╗ █████╗  ██████╗██╗  ██╗     █████╗  ██████╗ ███╗   ██╗ ██████╗      █████╗  ██████╗ ███████╗███╗   ██╗████████╗       
        ██║  ██║██╔══██╗██╔════╝██║ ██╔╝    ██╔══██╗██╔════╝ ████╗  ██║██╔═══██╗    ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝       
        ███████║███████║██║     █████╔╝     ███████║██║  ███╗██╔██╗ ██║██║   ██║    ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║          
        ██╔══██║██╔══██║██║     ██╔═██╗     ██╔══██║██║   ██║██║╚██╗██║██║   ██║    ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║          
        ██║  ██║██║  ██║╚██████╗██║  ██╗    ██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝    ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║          
        ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝          
        `}
      </pre>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="https://github.com/yashksaini-coder" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-terminal-cyan/80">
          <FaGithub size={24} />
        </a>
        <a href="https://x.com/yash_k_saini" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-terminal-cyan/80">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.linkedin.com/in/yashksaini/" target="_blank" rel="noopener noreferrer" className="text-terminal-cyan hover:text-terminal-cyan/80">
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  )
}

export default Logo
