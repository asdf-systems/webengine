var jsonObject = {
  "id": "/",
  "type": "Panel",
  "object": null,
  "position_x": "0px",
  "position_y": "0px",
  "width": "",
  "height": "",
  "children": {
     "PagePanel": {
              "id": "PagePanel/",
              "type": "PagePanel",
              "object": null,
              "position_x": "0px",
              "position_y": "0px",
              "width": "640px",
              "height": "480",
              "page_size_x" : "640px",
              "page_size_y" : "640px",
              "children": {
                "nextPageButton.txt": {
                  "id": "PagePanel/nextPageButton.txt",
                  "type": "Button",
                  "object": null,
                  "position_x": "440px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "PagePanel/nextPageButton/inactiv.jpg",
                  "activ_src": "PagePanel/nextPageButton/activ.jpg",
                  "hover_src": "PagePanel/nextPageButton/hover.jpg",
                  "extra_css": "standardButton",
                  "action_click": [
                    {
                      "name": "SPECIFIC",
                      "parameters": [
                        "PagePanel/",
                        "nextPage"
                      ]
                    }
                  ]
                },
                "page0": {
                  "id": "PagePanel/page0",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": "PagePanel/page0/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": "PagePanel/page0/image01.jpg"
                    }
                  }
                },
                "page1": {
                  "id": "PagePanel/page1",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": "PagePanel/page1/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": "PagePanel/page1/image01.jpg"
                    }
                  }
                },
                 "page2": {
                  "id": "PagePanel/page2",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": "PagePanel/page2/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": "PagePanel/page2/image01.jpg"
                    }
                  }
                },
                "prevPageButton.txt": {
                  "id": "PagePanel/prevPageButton.txt",
                  "type": "Button",
                  "object": null,
                  "position_x": "40px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "PagePanel/prevPageButton/inactiv.jpg",
                  "activ_src": "PagePanel/prevPageButton/activ.jpg",
                  "hover_src": "PagePanel/prevPageButton/hover.jpg",
                  "extra_css": "standardButton",
                  "action_click": [
                    {
                      "name": "SPECIFIC",
                      "parameters": [
                        "PagePanel/",
                        "prevPage"
                      ]
                    }
                  ]
                }
              },
              "animation_speed": "200000",
              "extra_css": "projectPagePanel",
              "pages": [
                "page0",
                "page1",
                "page2",
              ],
              "circular": "false"
            }
  }
};
