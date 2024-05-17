import "./Home.css"
import React from "react";

const Home = (props) => {
    return (
        <div className={"bg-light-gray"}>
            <div className={"top-section "}>
                <div className={"container row mb-5"}>
                    <div className={"col-1"}></div>
                    <div className={"col-5 mt-4"}>
                        <h1 className={"ms-4 mt-4 pt-4"}><i>Enhance Your Beauty</i></h1>
                        <h2 className={"ms-4 ps-4"}><i>Where Makeup Meets Magic!</i></h2>
                    </div>
                    <div className={"col-6"}>
                        <img alt="makeup"
                            src="https://media.istockphoto.com/id/1198065638/photo/makeup-concept-with-a-professional-makeup-brushes-with-glowing-purple-eye-shadow-isolated-on.jpg?s=612x612&w=0&k=20&c=6ZqaFvS0ZS8l7xiHa9Nt0T_NqExsYYF83Ku_gOSsnrY="/>
                    </div>
                </div>
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-4 mb-3"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1488453249/photo/make-up-table.jpg?s=612x612&w=0&k=20&c=2R92ilTXNRhQw6DDLpkBL3v-R2nk0QtBF3X9iA4LEQM="/>
                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1460122390/photo/portrait-beauty-and-facial-with-a-black-woman-in-studio-to-promote-natural-skincare-or.jpg?s=612x612&w=0&k=20&c=WA6m1w260HXlEoaamK46jZTbdz5qbQR64HlTbN4dYlM="/>
                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1418265792/photo/cosmetics-swatches-peach-beige-red-and-coral-toned-styled-cosmetics-flat-lay-closeup-colour.jpg?s=612x612&w=0&k=20&c=cGe0CALtQJtFApTJQioSyWXJ_onAZpmOi-1J7LBgvk4="/>
                    </div>
                </div>
                <div className={"row mb-3"}>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1408439145/photo/autumn-skincare-and-autumn-makeup-concept-with-beauty-products-on-table.jpg?s=612x612&w=0&k=20&c=kuyRQU6vR1uSUZK7GyddjJe1RE1OIQivfILVCn_yAdE="/>
                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1450342889/photo/beautiful-woman-with-bright-make-up.jpg?s=612x612&w=0&k=20&c=aguYV83bPT97tJ1ygLb5CVXhmbZDw_Ne-xyhJpuoFYU="/>
                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1224014576/photo/vanity-table-with-make-up-products-close-up.jpg?s=612x612&w=0&k=20&c=r95zagxEEqykMwSpCgza7cqpluw011QzZXW4TM39epc="/>
                    </div>
                </div>
                <div className={"row mb-3"}>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1404642794/photo/wooden-dressing-table-near-brown-wall-in-room.jpg?s=612x612&w=0&k=20&c=1JP2brc5LTBdLzVEhDQmTnOiMsJGHdCRgrt_VOBeUao="/>
                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1261302799/photo/portrait-of-beautiful-young-woman-making-make-up-looking-in-the-mirror-and-applying-cosmetic.jpg?s=612x612&w=0&k=20&c=Qe8FRF0ljLzeY_5ly8VkJenOv95VIEWmh7BJFPWLyd0="/>

                    </div>
                    <div className={"col-4"}>
                        <img className={"image-size"} alt="makeup" src="https://media.istockphoto.com/id/1299164489/photo/make-up-palette-and-brushes-professional-eyeshadow-palette.jpg?s=612x612&w=0&k=20&c=bbsPXRO_IzBWcLDtulNMn93534aSN_SRnZsdY0vwxao="/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
