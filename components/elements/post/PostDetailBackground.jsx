import React from 'react';
//import {ConnectPlugin} from '../../connectPlugins';
import { connect } from 'react-redux';
import { imageUrl } from '../../../api/url';
import moment from 'moment'
import { apiUrl } from '../../../api/url';

function PostDetailBackground({postDet}){
    

    return(
        <div>
    <div className='blog-detail-wrapper'>

    <div className="bdw-detail flex">
        <div className="bdwd-lft"> <img src={`${imageUrl}?path=${postDet.imagePath}&name=${postDet.image}&width=200&height=200`} alt="martfury" /> </div>
        <div className="bdw-content">
            <h2>{postDet.title}</h2>
            <h4>Categories : <span>{postDet.categoryName}</span></h4>

            <div dangerouslySetInnerHTML={{__html: postDet.description.replaceAll("&amp;", "&")
                                              .replaceAll("&lt;", "<")
                                              .replaceAll("&gt;", ">")
                                              .replaceAll("&quot;", '"')
                                              .replaceAll("&#39;", "'")
                                              .replaceAll("&sbquo;", "‚")
                                              .replaceAll("&#61;", "=")
                                              .replaceAll("&#45;", "-")
                                              .replaceAll("&hellip;", "…")
                                              .replaceAll("&commat;", "@")
                                              .replaceAll("&copy;", "©")
                                              .replaceAll("&#35;", "#")
                                              .replaceAll("&ldquo;", "“")
                                              .replaceAll("&rsquo;", "’")
                                              .replaceAll("&lsquo;", "‘")
                                              .replaceAll("&trade;", "™")
                                              .replaceAll("&reg;", "®")
                                              .replaceAll("&ndash;", "–")
                                              .replaceAll("&eacute;", "é")
                                              .replaceAll("&euro;", "€")
                                              .replaceAll("&pound;", "£")
                                              .replace(/<[^>]+>/g, "")}}/>
            
            <div className='bdw-share'>
                <h3>Share</h3>
                <div className="bdw-share-list flex">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${apiUrl}`} target="_blank"><img src="/static/img/fb.png" alt="" /></a>
                    <a  href={`https://twitter.com/home?status=${apiUrl}`} target="_blank"><img src="/static/img/tw.png" alt="" /></a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${apiUrl}`} target="_blank"><img src="/static/img/lin.png" alt="" /></a>
                    <a  href={`https://www.pinterest.com/pin/find/?url=${apiUrl}`} target="_blank"><img src="/static/img/red.png" alt="" /></a>
                </div>
            </div>
        </div>
    </div>
    </div>

   

    </div>
)
}

const mapStateToProps=state=>{
    return state.post
}
 
export default connect(mapStateToProps) (PostDetailBackground);
