var jsonObject = {
  "id": "/",
  "type": "Panel",
  "object": null,
  "position_x": "0px",
  "position_y": "0px",
  "width": "",
  "height": "",
  "children": {
     "RollOutPanel": {
          "id": "RollOutPanel/",
          "type": "RollOutPanel",
          "object": null,
          "position_x": "190px",
          "position_y": "100px",
          "width": "640px",
          "height": "480",
          "background_color" : "#aaaaaa",
          "animation_speed": "2000",
          "initial_show" : false,
          "children": {
            "image01.txt": {
              "id": "RollOutPanel/image01.txt",
              "type": "Image",
              "object": null,
              "position_x": "0px",
              "position_y": "0px",
              "children": null,
              "src": "RollOutPanel/image01.jpg"
            },
            "image02.txt": {
              "id": "RollOutPanel/image02.txt",
              "type": "Image",
              "object": null,
              "position_x": "100px",
              "position_y": "25px",
              "children": null,
              "src": "RollOutPanel/image02.jpg"
            },
            "image03.txt": {
              "id": "RollOutPanel/image03.txt",
              "type": "Image",
              "object": null,
              "position_x": "25px",
              "position_y": "100px",
              "children": null,
              "src": "RollOutPanel/image03.jpg"
            }
          },
     },
      "prevPageButton.txt": {
          "id": "prevPageButton.txt",
          "type": "Button",
          "object": null,
          "position_x": "40px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "prevPageButton/inactiv.jpg",
          "activ_src": "prevPageButton/activ.jpg",
          "hover_src": "prevPageButton/hover.jpg",
          "extra_css": "standardButton",
          "action_hover": [
            {
              "name": "SPECIFIC",
              "parameters": [
                "RollOutPanel/",
                "rollout"
              ]
            }
          ],
          "action_out": [
            {
              "name": "SPECIFIC",
              "parameters": [
                "RollOutPanel/",
                "rollup"
              ]
            }
          ]
        }
      } // children root
           
           
}; // jsonObject
