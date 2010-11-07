var jsonObject = {
  "id": "",
  "type": "Panel",
  "object": null,
  "position_x": "0px",
  "position_y": "0px",
  "width": "",
  "height": "",
  "children": {
    "elements": {
      "id": "elements",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "inputField": {
          "id": "elements/inputField",
          "type": "InputField",
          "object": null,
          "position_x": "270px",
          "position_y": "0px",
          "width": "202px",
          "height": "25px",
          "children": null,
          "input_sensitiv_field_offsetX": "23px",
          "input_sensitiv_field_offsetY": "0px",
          "backgroundImage_source": "inputField_bg.jpg",
          "forbidden_signs": "asdf",
          "password_modus": "false",
          "extra_css": "standartInputField"
        },
        "nextButton": {
          "id": "elements/nextButton",
          "type": "Button",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "elements/nextButton/nextButton.jpg",
          "extra_css": "nextButton"
        }
      }
    },
    "navi": {
      "id": "navi",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "newsButton": {
          "id": "navi/newsButton",
          "type": "Button",
          "object": null,
          "position_x": "276px",
          "position_y": "128px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "navi/newsButton/newButton.jpg",
          "action_click": [
            {
              "name": "HIDE",
              "parameters": [
                "navi/newsButton"
              ]
            }
          ],
          "extra_css": "bla"
        },
        "projectsButton": {
          "id": "navi/projectsButton",
          "type": "Button",
          "object": null,
          "position_x": "276px",
          "position_y": "167px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "navi/projectsButton/projectsButton.jpg",
          "action_click": [
            {
              "name": "HIDE",
              "parameters": [
                "navi/projectsButton"
              ]
            }
          ],
          "extra_css": "bla"
        }
      }
    },
    "news": {
      "id": "news",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "BackgroundElementOL.txt": {
          "position_x": "0px",
          "position_y": "0px",
          "extra_css": "backgroundImage",
          "object": null,
          "type": "Image",
          "src": "news/BackgroundElementOL.jpg",
          "id": "news/BackgroundElementOL.txt"
        },
        "BackgroundElementUL.txt": {
          "position_x": "1335px",
          "position_y": "910px",
          "extra_css": "backgroundImage",
          "object": null,
          "type": "Image",
          "src": "news/BackgroundElementUL.jpg",
          "id": "news/BackgroundElementUL.txt"
        },
        "ProjectPanel": {
          "id": "news/ProjectPanel",
          "type": "Panel",
          "object": null,
          "position_x": "430px",
          "position_y": "315px",
          "width": "0px",
          "height": "0px",
          "children": {
            "ImageNews01.txt": {
              "position_x": "-9px",
              "position_y": "35px",
              "extra_css": "bla",
              "object": null,
              "type": "Image",
              "src": "news/ProjectPanel/ImageNews01.jpg",
              "id": "news/ProjectPanel/ImageNews01.txt"
            },
            "Ueberschrift.txt": {
              "position_x": "-9px",
              "position_y": "6px",
              "extra_css": "bla",
              "object": null,
              "type": "Image",
              "src": "news/ProjectPanel/Ueberschrift1.jpg",
              "id": "news/ProjectPanel/Ueberschrift.txt"
            },
            "textNewsPanel": {
              "id": "news/ProjectPanel/textNewsPanel",
              "type": "Panel",
              "object": null,
              "position_x": "47px",
              "position_y": "435px",
              "width": "0px",
              "height": "0px",
              "children": {
                "realText": {
                  "id": "news/ProjectPanel/textNewsPanel/realText",
                  "type": "Panel",
                  "object": null,
                  "position_x": "-907px",
                  "position_y": "-1065px",
                  "width": "",
                  "height": "",
                  "children": {
                    "hideButton": {
                      "id": "news/ProjectPanel/textNewsPanel/realText/hideButton",
                      "type": "Button",
                      "object": null,
                      "position_x": "-882px",
                      "position_y": "-1040px",
                      "width": "",
                      "height": "",
                      "children": null,
                      "standard_src": "/elements/dummyButton.jpg",
                      "action_click": [
                        {
                          "name": "HIDE",
                          "parameters": [
                            "news/ProjectPanel/textNewsPanel/realText/textFeld/"
                          ]
                        }
                      ],
                      "extra_css": "imageTextField"
                    },
                    "textField": {
                      "id": "news/ProjectPanel/textNewsPanel/realText/textField",
                      "type": "TextField",
                      "object": null,
                      "position_x": "-807px",
                      "position_y": "-965px",
                      "width": "200px",
                      "height": "200px",
                      "children": null,
                      "font_size": "12pt",
                      "font_family": "Arial, Tahoma",
                      "text": "startText.txt",
                      "extra_css": "textField"
                    }
                  }
                },
                "textButton": {
                  "id": "news/ProjectPanel/textNewsPanel/textButton",
                  "type": "Button",
                  "object": null,
                  "position_x": "px",
                  "position_y": "px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "news/ProjectPanel/textNewsPanel/textButton/textNews01.jpg",
                  "action_click": [
                    {
                      "name": "SHOW",
                      "parameters": [
                        "news/ProjectPanel/textNewsPanel/realText/"
                      ]
                    }
                  ],
                  "extra_css": "imageTextField"
                }
              },
              "extra_css": "textToImageField"
            }
          },
          "extra_css": "newsPanel"
        },
        "StartText_ImageTextPanel": {
          "id": "news/StartText_ImageTextPanel",
          "type": "Panel",
          "object": null,
          "position_x": "477px",
          "position_y": "750px",
          "width": "0px",
          "height": "0px",
          "children": {
            "realText": {
              "id": "news/StartText_ImageTextPanel/realText",
              "type": "Panel",
              "object": null,
              "position_x": "-477px",
              "position_y": "-750px",
              "width": "",
              "height": "",
              "children": {
                "hideButton": {
                  "id": "news/StartText_ImageTextPanel/realText/hideButton",
                  "type": "Button",
                  "object": null,
                  "position_x": "-452px",
                  "position_y": "-725px",
                  "width": "",
                  "height": "",
                  "children": null,
                  "standard_src": "/elements/dummyButton.jpg",
                  "action_click": [
                    {
                      "name": "HIDE",
                      "parameters": [
                        "news/StartText_ImageTextPanel/realText/textFeld/"
                      ]
                    }
                  ],
                  "extra_css": "imageTextField"
                },
                "textField": {
                  "id": "news/StartText_ImageTextPanel/realText/textField",
                  "type": "TextField",
                  "object": null,
                  "position_x": "-377px",
                  "position_y": "-650px",
                  "width": "200px",
                  "height": "200px",
                  "children": null,
                  "font_size": "12pt",
                  "font_family": "Arial, Tahoma",
                  "text": "startText.txt",
                  "extra_css": "textField"
                }
              }
            },
            "textButton": {
              "id": "news/StartText_ImageTextPanel/textButton",
              "type": "Button",
              "object": null,
              "position_x": "px",
              "position_y": "px",
              "width": "",
              "height": "",
              "children": null,
              "standard_src": "news/StartText_ImageTextPanel/textButton/startText.jpg",
              "action_click": [
                {
                  "name": "SHOW",
                  "parameters": [
                    "news/StartText_ImageTextPanel/realText/"
                  ]
                }
              ],
              "extra_css": "imageTextField"
            }
          },
          "extra_css": "textToImageField"
        }
      }
    },
    "projects": {
      "id": "projects",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "projectAlpha": {
          "id": "projects/projectAlpha",
          "type": "Panel",
          "object": null,
          "position_x": "0px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null
        }
      }
    },
    "static": {
      "id": "static",
      "type": "Panel",
      "object": null,
      "position_x": "0px",
      "position_y": "0px",
      "width": "",
      "height": "",
      "children": {
        "changeBrightness": {
          "id": "static/changeBrightness",
          "type": "Button",
          "object": null,
          "position_x": "1100px",
          "position_y": "0px",
          "width": "",
          "height": "",
          "children": null,
          "standard_src": "static/changeBrightness/changeBrightnessButton.jpg",
          "extra_css": "imageButton"
        },
        "footerImage.txt": {
          "position_x": "270",
          "position_y": "1150",
          "extra_css": "static_image",
          "object": null,
          "type": "Image",
          "src": "static/footerImage.jpg",
          "id": "static/footerImage.txt"
        },
        "logo.txt": {
          "position_x": "900px",
          "position_y": "70px",
          "extra_css": "static_image",
          "object": null,
          "type": "Image",
          "src": "static/logo.jpg",
          "id": "static/logo.txt"
        }
      }
    }
  }
}
