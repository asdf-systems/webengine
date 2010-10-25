var jsonObject = {
  "id": ".\/",
  "type": "Panel",
  "object": null,
  "position_x": "0px",
  "position_y": "0px",
  "width": "",
  "height": "",
  "children": {
    "elements": {
      "id": ".\/\/elements",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "nextButton": {
          "id": ".\/\/elements\/nextButton",
          "type": "Button",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "normal.jpg",
          "activ_src": "activ.jpg",
          "hover_src": "hover.jpg",
          "extra_css": "standardButton"
        },
        "prevButton": {
          "id": ".\/\/elements\/prevButton",
          "type": "Button",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "normal.jpg",
          "activ_src": "activ.jpg",
          "hover_src": "hover.jpg",
          "extra_css": "standardButton"
        },
        "standardButton": {
          "id": ".\/\/elements\/standardButton",
          "type": "Button",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "normal.jpg",
          "activ_src": "activ.jpg",
          "hover_src": "hover.jpg",
          "extra_css": "standardButton"
        }
      }
    },
    "website": {
      "id": ".\/\/website",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "100%",
      "height": "100%",
      "children": {
        "navi": {
          "id": ".\/\/website\/navi",
          "type": "HVPanel",
          "object": null,
          "position_x": "20px",
          "position_y": "20px",
          "width": "",
          "height": "",
          "children": {
            "button01.txt": {
              "id": ".\/\/website\/navi\/button01.txt",
              "type": "Button",
              "object": null,
              "position_x": "0px",
              "position_y": "0px",
              "width": "",
              "height": "",
              "children": null,
              "standard_src": "normal.jpg",
              "activ_src": "activ.jpg",
              "hover_src": "hover.jpg",
              "extra_css": "standardButton",
              "action_click": [
                {
                  "name": "SHOW",
                  "parameters": [
                    "\/website\/projects"
                  ]
                }
              ]
            }
          },
          "orientation": "horizontal"
        },
        "projects": {
          "id": ".\/\/website\/projects",
          "type": "Panel",
          "object": null,
          "position_x": "100px",
          "position_y": "100px",
          "width": "",
          "height": "",
          "children": {
            "ChangePanel": {
              "id": ".\/\/website\/projects\/ChangePanel",
              "type": "ChangePanel",
              "object": null,
              "position_x": "0px",
              "position_y": "0px",
              "width": "",
              "height": "",
              "children": {
                "page0": {
                  "id": ".\/\/website\/projects\/ChangePanel\/page0",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": ".\/\/website\/projects\/ChangePanel\/page0\/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": ".\/image01.jpg"
                    }
                  }
                },
                "page1": {
                  "id": ".\/\/website\/projects\/ChangePanel\/page1",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": ".\/\/website\/projects\/ChangePanel\/page1\/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": ".\/image01.jpg"
                    }
                  }
                }
              },
              "variable_name": "loginStatus",
              "pages": [
                "page0",
                "page1"
              ]
            },
            "Project1": {
              "id": ".\/\/website\/projects\/Project1",
              "type": "PagePanel",
              "object": null,
              "position_x": "0px",
              "position_y": "0px",
              "width": "",
              "height": "",
              "children": {
                "nextButton.txt": {
                  "id": ".\/\/website\/projects\/Project1\/nextButton.txt",
                  "type": "Button",
                  "object": null,
                  "position_x": "440px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "normal.jpg",
                  "activ_src": "activ.jpg",
                  "hover_src": "hover.jpg",
                  "extra_css": "standardButton",
                  "action_click": [
                    {
                      "name": "SPECIFIC",
                      "parameters": [
                        ".",
                        " nextPage"
                      ]
                    }
                  ]
                },
                "page01": {
                  "id": ".\/\/website\/projects\/Project1\/page01",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": ".\/\/website\/projects\/Project1\/page01\/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": ".\/image01.jpg"
                    }
                  }
                },
                "page02": {
                  "id": ".\/\/website\/projects\/Project1\/page02",
                  "type": "Panel",
                  "object": null,
                  "position_x": "0px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": {
                    "image01": {
                      "id": ".\/\/website\/projects\/Project1\/page02\/image01",
                      "type": "Image",
                      "object": null,
                      "position_x": "20px",
                      "position_y": "20px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "src": ".\/image01.jpg"
                    }
                  }
                },
                "prevButton.txt": {
                  "id": ".\/\/website\/projects\/Project1\/prevButton.txt",
                  "type": "Button",
                  "object": null,
                  "position_x": "40px",
                  "position_y": "0px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "normal.jpg",
                  "activ_src": "activ.jpg",
                  "hover_src": "hover.jpg",
                  "extra_css": "standardButton",
                  "action_click": [
                    {
                      "name": "SPECIFIC",
                      "parameters": [
                        ".",
                        " prevPage"
                      ]
                    }
                  ]
                }
              },
              "animation_speed": "200",
              "extra_css": "projectPagePanel",
              "pages": [
                "page01",
                "page02"
              ],
              "circular": "false"
            }
          }
        }
      }
    }
  }
}
