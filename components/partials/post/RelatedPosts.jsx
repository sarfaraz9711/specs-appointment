import React from 'react';
import Link from 'next/link';
import PostGrid from '../../elements/post/PostGrid';
import { connect } from 'react-redux';
import { imageUrl } from '../../../api/url';
import moment from 'moment'
function RelatedPosts({ relatedBlog, setPostLoading }) {
    return (
        <>
          <div className='blog-detail-wrapper'>
            {relatedBlog.length!==0?<div className='blog-recent-post'>
              <h3>Related Blogs </h3>
               
             
                <div className='brp-row'>
                    {relatedBlog.map(data => (
                        <>
                            <div className='brp-col'>
                               
                                <Link href="/post/[pid]" as={`/post/${data.blogSlug}`}>
                                    <a onClick={e => setPostLoading(true)}>
                                        <img src={imageUrl + "?path=" + data.imagePath + "&name=" + data.image + "&width=200&height=200"} alt="martfury" />

                                        <div className='brp-content'>
                                            <h4>{data.title}</h4>
                                          
                                        </div>
                                        <div className="brb-footer flex">
                                            {moment(data.createdDate).format('DD MMM, YYYY')}
                                        </div>
                                    </a>
                                </Link>
                            
                            
                             </div>
                        </>
                    ))}


                </div>
                
                
            </div>:""}
            </div>
        </>
       
        
    );

}

const mapStateToProps = state => {
    return state.post
}

export default connect(mapStateToProps)(RelatedPosts);
