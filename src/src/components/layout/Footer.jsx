import { House, Search, User } from 'lucide-react'

function Footer() {
    return (
        <div className="
                w-screen h-20 bg-accent-400 border-t rounded-t-2xl text-primary 
                flex items-center justify-around
            "
        >
            <Menu />
        </div>

    )
}

export default Footer

const Menu = function (){
    return (
        <div className='w-full h-full flex items-center justify-around'>
            <MenuItem icon={<House size={25} />} />
            <MenuItem icon={<Search size={35} />} isHighlighted={true} />
            <MenuItem icon={<User size={25} />}/>
        </div>
    )
}

const MenuItem = function({isHighlighted = false, icon = <div />}){
    return (
        <div
            className={`
                h-full aspect-square flex items-center justify-center transition-all duration-200 ease-in-out
                ${isHighlighted
                    ? '!h-[90%] relative -top-[25%] scale-105 hover:scale-115 rounded-full bg-primary text-accent-100 shadow-md ring-2 ring-primary/50'
                    : 'text-primary hover:text-primary/90 hover:scale-130'}
            `}
        >
  {icon}
</div>

    )
}