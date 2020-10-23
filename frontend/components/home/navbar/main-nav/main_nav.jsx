import React from "react";

const links = {
    home: { url: "/#/",
            icon: <i className="fas fa-home" />},
    github: {url: "//github.com/kevinyieh/friendlybook",
            icon: <i className="fab fa-github" /> },
    linkedIn: {url: "//www.linkedin.com/in/kevin-yieh",
            icon: <i className="fab fa-linkedin-in" />},
    angel: {url: "https://angel.co/u/kevin-yieh",
            icon: <i className="fab fa-angellist" />},
    githubIO: {url: "https://kevinyieh.github.io/",
                icon: <i className="far fa-user" />}
    }

export default function MainNav( { pathName }){
    return (
        <ul className="main-nav-list">
            {Object.keys(links).map( (key,i) => {
                return <a key={key} className={i===0 && pathName==="/" ? "selected" : "unselected"} href={links[key].url}>
                    {links[key].icon}
                </a>
            })}
        </ul>
    )
}