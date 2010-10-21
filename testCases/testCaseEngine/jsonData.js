// Json TestFile
var jsonObject = {
    root : [
        {
        id:"MasterPanel.txt",
        type:"Panel",
        object:null,
        positionX:100,
        positionY:25,
        extra_css_class:"masterPanel",
        bgImage_normal:"mainbg_normal.jpg",
        bgImage_active:"",
        bgImage_hover:"",
        childs : [
            {   id:"/MasterPanel/PagePanel1.txt",
                type:"PagePanel",
                object:null,
                positionX:20,
                positionY:20,
                extra_css:"news_main",
                bgImage_normal:"",
                bgImage_active:"",
                bgImage_hover:"",
                animationSpeed:200,
                pages: [ {page1:"seite01",page2:"seite02",page3:"seite03"}],
                childs : [
                    {   id:"/MasterPanel/PagePanel1/nextButton.txt",
                        type:"Button",
                        object:null,
                        positionX:250,
                        positionY:100,
                        extra_css:"nextPage",
                        image_normal:"elements/nextPageButton/nextPage_normal.jpg",
                        image_active:"elements/nextPageButton/nextPage_active.jpg",
                        image_hover:"elements/nextPageButton/nextPage_hover.jpg"
                    
                    } ,
                    {   id:"/MasterPanel/PagePanel1/prevButton.txt",
                        type:"Button",
                        object:null,
                        positionX:10,
                        positionY:100,
                        extra_css:"prevPage",
                        image_normal:"elements/prevPageButton/prevPage_normal.jpg",
                        image_active:"elements/prevPageButton/prevPage_active.jpg",
                        image_hover:"elements/prevPageButton/prevPage_hover.jpg"
                    
                    }                
                ]
            }
        
        ]
        }
                
                   
        
    ] 
};
