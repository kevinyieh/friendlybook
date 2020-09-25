import React from "react";
import PostItem from "../../post/post_item";

export default class Newsfeed extends React.Component{
    constructor(props){
        super(props)
        this.renderPostItem = this.renderPostItem.bind(this);
    }
    componentDidMount(){
        this.props.fetchNewsfeed();
    }
    renderPostItem(post){
        if(this.props.users[post.userId] && this.props.users[post.wallId]){
            return (<PostItem key={post.id} 
                post={post} 
                poster={{
                            id: post.userId,
                            fullName: `${this.props.users[post.userId].firstName} ${this.props.users[post.userId].lastName}`
                        }}
                postee={{
                    id: post.wallId,
                    fullName: `${this.props.users[post.wallId].firstName} ${this.props.users[post.wallId].lastName}`
                }}/>
            )
        }
        return null;
    }
    render(){
        if(Object.values(this.props.users).length < 1) return null;
        return(
            <div className="newsfeed">
                {this.props.posts.map(this.renderPostItem)}
            </div>
        )
    }
}