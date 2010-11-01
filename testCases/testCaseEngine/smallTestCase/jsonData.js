var jsonObject = {
  "id": "/",
  "type": "Panel",
  "object": null,
  "position_x": "0px",
  "position_y": "0px",
  "width": "",
  "height": "",
  "children": {
    "firstPanel": {
      "id": "/firstPanel",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "input01": {
          "id": "firstPanel/input01",
          "type": "InputField",
          "object": null,
          "position_x": "50px",
          "position_y": "250px",
          "width": "",
          "height": "",
          "children": null,
          "src": "firstPanel/image01.jpg",
          "extra_css": "standardImage",
        }
      }
    },
      "secondPanel": {
      "id": "/secondPanel",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "nextPageButton": {
          "id": "secondPanel/image01",
          "type": "Image",
          "object": null,
          "position_x": "50px",
          "position_y": "150px",
          "width": "",
          "height": "",
          "children": null,
          "src": "secondPanel/image01.jpg",
          "extra_css": "standardImage"
        }
      }
    },
    "naviPanel": {
          "id": "/naviPanel",
          "type": "Panel",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": {
            "nextPageButton": {
              "id": "naviPanel/nextPageButton",
              "type": "Button",
              "object": null,
              "position_x": "250px",
              "position_y": "50px",
              "width": "",
              "height": "",
              "children": null,
              "standard_src": "naviPanel/nextPageButton/inactiv.jpg",
              "activ_src": "naviPanel/nextPageButton/activ.jpg",
              "hover_src": "naviPanel/nextPageButton/hover.jpg",
              "extra_css": "standardButton",
              "action_click": [
                {
                  "name": "SHOW",
                  "parameters": [
                    "secondPanel/"
                  ]
                },
                {
                  "name": "HIDE",
                  "parameters": [
                    "firstPanel/"
                  ]
                }
              ]
            },
            "prevPageButton": {
              "id": "naviPanel/prevPageButton",
              "type": "Button",
              "object": null,
              "position_x": "0px",
              "position_y": "50px",
              "width": "",
              "height": "",
              "children": null,
              "standard_src": "naviPanel/prevPageButton/inactiv.jpg",
              "activ_src": "naviPanel/prevPageButton/activ.jpg",
              "hover_src": "naviPanel/prevPageButton/hover.jpg",
              "extra_css": "standardButton",
              "action_click": [
                {
                  "name": "SHOW",
                  "parameters": [
                    "firstPanel/"
                  ]
                },
                {
                  "name": "HIDE",
                  "parameters": [
                    "secondPanel/"
                  ]
                }
              ]
           }
      }
    }
  }
};
