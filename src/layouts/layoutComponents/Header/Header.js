import React, { useState, useEffect } from 'react';
// import { ProLayout } from '@ant-design/pro-components';
import { Link } from 'react-router-dom';
import { MenuUnfoldOutlined, DatabaseFilled, LeftOutlined } from '@ant-design/icons';

function MyHeader() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [bar, setBar] = useState(false);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (Number(windowWidth) >= 768) {
            setBar(false);
        }
    }, [windowWidth]);
    return (
        <div className="relative">
            <div className=" fixed top-0 z-10 w-full bg-[#fafafa]">
                <div className="w-full">
                    <div className="ml-4 flex w-full py-[12px]">
                        {windowWidth < 768 ? (
                            <MenuUnfoldOutlined
                                onClick={() => {
                                    setBar(!bar);
                                }}
                                className="mx-2 cursor-pointer p-2"
                            />
                        ) : null}
                        <Link to={'/'} className="flex cursor-pointer">
                            <img className="h-8" src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="LOGO" />
                            {windowWidth > 768 ? (
                                <div>
                                    <h1 className="pl-2 text-base font-semibold">Test</h1>
                                </div>
                            ) : null}
                        </Link>
                        {windowWidth > 768 ? (
                            <div className="flex-[1] pl-[6px]">
                                <div className="px-4">
                                    <Link className="text-sm font-normal text-[#878787]" to={'/todo'}>
                                        To do
                                    </Link>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <hr className=" z-20 w-full"></hr>
            </div>
            {bar ? (
                <div className="absolute left-0 top-0 z-30  w-full">
                    <div className="flex">
                        <div className="z-50 h-[100vh] min-w-[256px] !bg-[#fafafa]">
                            <div className="relative flex justify-between">
                                <div className=" ml-2 mr-7 mt-2 flex-[1] rounded bg-[#f5f5f5] py-2 pl-4 pr-4">
                                    <Link className="text-sm font-normal text-[#878787]" to={'/todo'}>
                                        To do
                                    </Link>
                                </div>
                                <LeftOutlined
                                    className="absolute right-0 z-[60] ml-6 mt-5 rounded-3xl px-1 py-1"
                                    style={{
                                        boxShadow: '0 0.1rem 0.25rem rgba(191, 191, 191, 1)',
                                    }}
                                    onClick={() => {
                                        setBar(!bar);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="z-40 h-[100vh] flex-[1] bg-[#181717] opacity-[0.5]"></div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
// function MyHeader() {
//     const [pathname, setPathname] = useState('/');
//     const navigate = useNavigate();

//     const settings = {
//         fixSiderbar: true,
//         layout: 'top',
//         splitMenus: true,
//     };
//     const LogoDefine = () => {
//         return (
//             <Link to={'/'} className="flex cursor-pointer">
//                 <img
//                     className="h-8"
//                     // src="./images/logo/geekup_logo.svg"
//                     src="https://geekup.vn/Icons/geekup-logo-general.svg"
//                     alt="LOGO"
//                 />
//                 <h1 className="pl-2 text-base font-semibold">Test</h1>
//             </Link>
//         );
//     };
//     const defaultPropsMy = {
//         route: {
//             path: '/todo',
//             routes: [
//                 {
//                     path: '/todo',
//                     name: 'To do',
//                     // icon: <SmileFilled />,
//                     // component: './Welcome',
//                 },
//                 {
//                     path: '/',
//                     name: 'Lo go',
//                     // icon: <SmileFilled />,
//                     component: <LogoDefine />,
//                 },
//             ],
//         },
//         location: {
//             pathname: '/',
//         },
//     };
//     return (
//         <div
//             id="test-pro-layout"
//             style={{
//                 height: '100vh',
//             }}
//         >
//             <ProLayout
//                 logo="https://geekup.vn/Icons/geekup-logo-general.svg"
//                 title="Test"
//                 {...defaultPropsMy}
//                 {...settings}
//                 menuItemRender={(item, dom) => (
//                     <div
//                         key={item}
//                         onClick={() => {
//                             console.log('item = ', item);
//                             navigate(`${item.path}`);
//                         }}
//                     >
//                         {dom}
//                     </div>
//                 )}
//             ></ProLayout>
//         </div>
//     );
// }

export default MyHeader;
