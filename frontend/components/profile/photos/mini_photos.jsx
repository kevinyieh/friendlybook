import React from "react";

export default class MiniPhotos extends React.Component {
    renderPhotos(photos){
        const row1= photos.slice(0,3);
        const row2= photos.slice(3,6);
        const row3= photos.slice(6,9);
        return (
            <div className="mini-photos-container">
                {row1.length > 0 ? <div className="small-photos-row"> {this.renderPhotoRow(row1,0)} </div>  : null}
                {row2.length > 0 ? <div className="small-photos-row"> {this.renderPhotoRow(row2,1)} </div>  : null}
                {row3.length > 0 ? <div className="small-photos-row"> {this.renderPhotoRow(row3,2)} </div>  : null}
            </div>
        )
    }
    renderPhotoRow(row,r){
        return (
            <ul className="small-photos-list">
                {row.map( (photo,i) => <img key={`${r}${i}`} className={`small-photo-${r}-${i}`} src={photo}/>)}
            </ul>
        )
    }
    render(){
        return (
            <div className="profile-photos-section">
                <h2> Photos </h2>
                {this.renderPhotos(this.props.photos)}
            </div>
        )
    }
}