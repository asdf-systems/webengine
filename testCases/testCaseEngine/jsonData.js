// Json TestFile
var jsonData = {
    "root" :{
        id="/MasterPanel.txt",
        type="Panel",
        object="null",
        positionX=100px,
        positionY=25px,
        extra_css_class="masterPanel",
        bgImage_normal="../testCases/testCaseEngine/mainbg_normal.jpg",
        bgImage_active="",
        bgImage_hover="",
        childs : [
            {   id="/MasterPanel/PagePanel1.txt",
                type="PagePanel",
                object="null",
                positionX=20,
                positionY=20,
                extra_css="news_main",
                bgImage_normal="",
                bgImage_active="",
                bgImage_hover="",
                animationSpeed=200,
                pages={"seite01","seite02","seite03"},
                childs : [
                    {   id="/MasterPanel/PagePanel1/nextButton.txt",
                        type="Button",
                        object="null",
                        positionX=250,
                        positionY=100,
                        extra_css="nextPage",
                        image_normal="../testCases/testCaseEngine/elements/nextPageButton/normal.jpg",
                        image_active="../testCases/testCaseEngine/elements/nextPageButton/active.jpg",
                        image_hover="../testCases/testCaseEngine/elements/nextPageButton/hover.jpg",
                    
                    },
                    {   id="/MasterPanel/PagePanel1/prevButton.txt",
                        type="Button",
                        object="null",
                        positionX=10,
                        positionY=100,
                        extra_css="prevPage",
                        image_normal="../testCases/testCaseEngine/elements/prevPageButton/normal.jpg",
                        image_active="../testCases/testCaseEngine/elements/prevPageButton/active.jpg",
                        image_hover="../testCases/testCaseEngine/elements/prevPageButton/hover.jpg",
                    
                    }                
                ]
            }
                
                   
        ]
    } 
};
