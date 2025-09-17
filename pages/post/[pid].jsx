import React, { useEffect, useState } from 'react';

import FooterDefault from '../../components/shared/footers/FooterDefault';
import PostDetailBackground from '../../components/elements/post/PostDetailBackground';
import RelatedPosts from '../../components/partials/post/RelatedPosts';
import HeaderDefault from '../../components/shared/headers/HeaderDefault';
import HeaderMobile from '../../components/shared/headers/HeaderMobile';
import NavigationList from '../../components/shared/navigation/NavigationList';
import Router from 'next/router';
import { blogDetailApi } from '../../api';
import { blogRelatedApi } from '../../api';
import { useDispatch } from 'react-redux';
import useNetwork from '../../components/reusable/NetworkCheck';
import { useRouter } from 'next/router';

const PostDetailDynamic = ({ query }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [postLoading, setPostLoading] = useState(true)
    const network = useNetwork()

    useEffect(() => {
        if (network === false) { Router.push('/network-error') }
    }, [])

    // console.log(router.query.pid,"query")

    useEffect(() => {
        const pid = router.query.pid;
        if (pid === undefined) {
            Router.push('/page/page-404');
        }
        if (pid) {
            blogDetailApi(pid, dispatch, setPostLoading)
            blogRelatedApi(pid, dispatch)
        }
        Router.events.on('routeChangeStart', (url) => {
            const nextPid = url.split('/').pop();
            if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
                setPostLoading(true)
            }
        });
    }, [postLoading])

    return (
        <div className="site-content">
            <HeaderDefault />
            <HeaderMobile />
            <NavigationList />
            {postLoading === false ? <PostDetailBackground /> : <div className="ps-post--detail" style={{ marginTop: "50px", marginBottom: "50px" }}>
                <center><img src="/static/img/spurt-original-loader.gif" /></center>
            </div>}
            <div className="container">
                {postLoading === false && <RelatedPosts setPostLoading={setPostLoading} />}
            </div>
            <FooterDefault />
        </div>
    );
};

export default PostDetailDynamic;

PostDetailDynamic.getInitialProps = async (ctx) => ({
    query: ctx.query
})
