import React from "react";

const links = {
    home: { url: "/#/",
            icon: <i className="fas fa-home" />},
    github: {url: "//github.com/kevinyieh/friendlybook",
            icon: <i className="fab fa-github" /> },
    linkedIn: {url: "#",
            icon: <i className="fab fa-linkedin-in" />},
    angel: {url: "#",
            icon: <i className="fab fa-angellist" />},
    githubIO: {url: "#",
                icon: <i className="far fa-user" />}
    }

export default function MainNav(){
    return (
        <ul className="main-nav-list">
            {Object.values(links).map( (link,i) => {
                return <a className={i===0 ? "selected" : "unselected"} href={link.url}>
                    {link.icon}
                </a>
            })}
        </ul>
    )
}