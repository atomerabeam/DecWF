sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/routing/HashChanger"
],
    function (Controller, JSONModel, MessageBox, HashChanger) {
        "use strict";

        return Controller.extend("zdecwfapp.controller.EmpDetails", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteEmpDetails").attachPatternMatched(this._onObjectMatched, this);
                this._resetVisibility();
                // var oHashChanger = HashChanger.getInstance();

                // Attach beforeRouteMatched to intercept route changes before they happen
                // oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);

            },
            

            // _onBeforeRouteMatched: function (oEvent) {

            //     var that = this;

            //     oEvent.preventDefault();

            //     MessageBox.warning("Changes might be lost. Do you want to go back?", {
            //         actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            //         onClose: function (oAction) {
            //             if (oAction === MessageBox.Action.OK) {
            //                 // Go back if the user confirms
            //                 window.history.go(-1);
            //             } else {
            //                 // If user cancels, reset the hash to stay on the same page 
            //                 var oHashChanger = HashChanger.getInstance();                           
            //                 oHashChanger.replaceHash(oHashChanger.getHash());
            //             }
            //         }
            //     });
            // },

            _resetVisibility: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    bTog_sec: false,
                    bFooter: true,
                    bMainSec: true,
                    bSection1: false,
                    bSection2: false,
                    bSection3: false,
                    bSection4: false,
                    bSection5: false,
                    bSection6: false,
                    bSection7: false,
                    bSection8: false,
                    bSectionVis1: false,
                    bSectionVis2: false,
                    bSectionVis3: false,
                    bSectionVis4: false,
                    bSectionVis5: false,
                    bSectionVis6: false,
                    bSectionVis7: false,
                    bSectionVis8: false,
                    bTogSectionVis1: false,
                    bTogSectionVis2: false,
                    bTogSectionVis3: false,
                    bTogSectionVis4: false,
                    bTogSectionVis5: false,
                    bTogSectionVis6: false,
                    bTogSectionVis7: false,
                    bTogSectionVis8: false,
                    bTextArea: true,
                    isLevel1editable: false,
                    isLevel2editable: false,
                    isLevel3editable: false,
                    iCount: 0
                }), "oModelVisibility");
                this.getView().byId("idNext").setEnabled(true);
                this.getView().byId("idSubmit").setEnabled(false);
                this.getView().byId("idPrev").setEnabled(false);
            },

            _onObjectMatched: function (oEvent) {
                this.employeeId = oEvent.getParameter("arguments").requestId;
                this.wfId = oEvent.getParameter("arguments").wfId;
                // this.head = oEvent.getParameter("arguments").head;
                // const oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZDECWF_SRV/")
                const oModel = this.getOwnerComponent().getModel();
                var oGlobalModel = this.getView().getModel("oGlobalModel");
                this._resetVisibility();


                /*
                this.remarksToSend = [];
                const remark1 = oGlobalModel.getProperty("/REMARK1");
                const remark2 = oGlobalModel.getProperty("/REMARK2");
                const remark3 = oGlobalModel.getProperty("/REMARK3");
                if (remark1 !== "") {
                    this.remarksToSend.push(remark1);
                }
                if (remark2 !== "") {
                    this.remarksToSend.push(remark2);
                }
                if (remark3 !== "") {
                    this.remarksToSend.push(remark3);
                }

                */

                let filter = {
                    "Action": "GETDETAIL",
                    "employeeid": this.employeeId,
                    "wfid": this.wfId
                };
                let sFilter = JSON.stringify(filter);
                filter = { "Input": sFilter };
                var sUrl = "/EntitySet('" + encodeURIComponent(sFilter) + "')";
                this.getView().setBusy(true);
                oModel.read(sUrl, {
                    success: function (oData) {
                        // Parse the returned data
                        oData = JSON.parse(oData.Output);
                        // Parse section data

                        var parsedSection1Data = oData.SECTION1 ? JSON.parse(oData.SECTION1) : [{}];
                        var parsedSection2Data = oData.SECTION2 ? JSON.parse(oData.SECTION2) : [{}];
                        var parsedSection3Data = oData.SECTION3 ? JSON.parse(oData.SECTION3) : [{}];
                        var parsedSection4Data = oData.SECTION4 ? JSON.parse(oData.SECTION4) : [{}];
                        var parsedSection5Data = oData.SECTION5 ? JSON.parse(oData.SECTION5) : [{}];
                        var parsedSection6Data = oData.SECTION6 ? JSON.parse(oData.SECTION6) : [{}];
                        var parsedSection7Data = oData.SECTION7 ? JSON.parse(oData.SECTION7) : [{}];
                        var parsedSection8Data = oData.SECTION8 ? JSON.parse(oData.SECTION8) : [{}];

                        var oModelVisibility = this.getView().getModel("oModelVisibility");

                        

                            var aSections = [];
                            if (parsedSection1Data?.FLAG) {
                                aSections.push(1);
                            }
                            if (parsedSection2Data[0]?.FLAG) {
                                aSections.push(2);
                            }
                            if (parsedSection3Data[0]?.FLAG) {
                                aSections.push(3);
                            }
                            if (parsedSection4Data[0]?.FLAG) {
                                aSections.push(4);
                            }
                            if (parsedSection5Data[0]?.FLAG) {
                                aSections.push(5);
                            }
                            if (parsedSection6Data[0]?.FLAG) {
                                aSections.push(6);
                            }
                            if (parsedSection7Data[0]?.FLAG) {
                                aSections.push(7);
                            }

                            oModelVisibility.setProperty("/aSections", aSections);

                            if (parsedSection1Data?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis1", true);
                                oModelVisibility.setProperty("/currentSelection", 1);
                            }
                            else if (parsedSection2Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis2", true);
                                oModelVisibility.setProperty("/currentSelection", 2);
                            } else if (parsedSection3Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis3", true);
                                oModelVisibility.setProperty("/currentSelection", 3);
                            } else if (parsedSection4Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis4", true);
                                oModelVisibility.setProperty("/currentSelection", 4);
                            } else if (parsedSection5Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis5", true);
                                oModelVisibility.setProperty("/currentSelection", 5);
                            } else if (parsedSection6Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis6", true);
                                oModelVisibility.setProperty("/currentSelection", 6);
                            } else if (parsedSection7Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bSectionVis7", true);
                                oModelVisibility.setProperty("/currentSelection", 7);
                            }

                            if (parsedSection1Data?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis1", true);
                            }
                            if (parsedSection2Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis2", true);
                            } 
                             if (parsedSection3Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis3", true);
                            } 
                             if (parsedSection4Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis4", true);
                            }  
                            if (parsedSection5Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis5", true);
                            } 
                             if (parsedSection6Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis6", true);
                            } 
                             if (parsedSection7Data[0]?.FLAG) {
                                oModelVisibility.setProperty("/bTogSectionVis7", true);
                            }


                            var updatedData = {
                                level: oData.LEVEL,
                                section1: parsedSection1Data,
                                section2: parsedSection2Data,
                                section3: parsedSection3Data,
                                section4: parsedSection4Data,
                                section5: parsedSection5Data,
                                section6: parsedSection6Data,
                                section7: parsedSection7Data,
                                section8: parsedSection8Data

                            };
                            if (oData.HR_HEAD !== 'X') {
                            this.getView().byId("IDdetailSwitch").setVisible(true);
                            this.getView().byId("IDDetailText").setVisible(true);
                            var oGlobalModel = this.getView().getModel("oGlobalModel");
                            this.oData = oData;
                            if (oData.LEVEL == 1) {
                                oGlobalModel.setProperty("/isVBox1Visible", true);
                                oGlobalModel.setProperty("/isVBox2Visible", false);
                                oGlobalModel.setProperty("/isVBox3Visible", false);
                                oGlobalModel.setProperty("/isLevel1editable", true);
                                oGlobalModel.setProperty("/isLevel2editable", false);
                                oGlobalModel.setProperty("/isLevel3editable", false);
                            } else if (oData.LEVEL == 2) {
                                oGlobalModel.setProperty("/isVBox1Visible", true);
                                oGlobalModel.setProperty("/isVBox2Visible", true);
                                oGlobalModel.setProperty("/isVBox3Visible", false);
                                oGlobalModel.setProperty("/isLevel1editable", false);
                                oGlobalModel.setProperty("/isLevel2editable", true);
                                oGlobalModel.setProperty("/isLevel3editable", false);
                            } else if (oData.LEVEL == 3) {
                                oGlobalModel.setProperty("/isVBox1Visible", true);
                                oGlobalModel.setProperty("/isVBox2Visible", true);
                                oGlobalModel.setProperty("/isVBox3Visible", true);
                                oGlobalModel.setProperty("/isLevel1editable", false);
                                oGlobalModel.setProperty("/isLevel2editable", false);
                                oGlobalModel.setProperty("/isLevel3editable", true);
                            }

                        } else {
                            oModelVisibility.setProperty("/bTog_sec", true);
                            oModelVisibility.setProperty("/bMainSec", false);
                            oModelVisibility.setProperty("/bFooter", false);
                            this.getView().byId("IDdetailSwitch").setVisible(false);
                            this.getView().byId("IDDetailText").setVisible(false);
                        }
                        var oFormModel = new sap.ui.model.json.JSONModel(updatedData);
                        this.getView().setModel(oFormModel, "formModel");
                        oFormModel.refresh();
                        this.getView().setBusy(false);

                    }.bind(this),
                    error: function (oError) {
                        this.getView().setBusy(false);                                             
                     if    (JSON.parse(oError.responseText)?.error?.message?.value  === 'I::000 Unauthorised user   '){
                        var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                        sap.m.MessageBox.error(oResourceBundle.getText("unauthorized"), {
                            title: "Unauthorized Access",
                            onClose: function () {
                                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                oRouter.navTo("RouteApp");
                            }.bind(this)
                        });

                     }
                        
                        
                    }.bind(this)
                });
            },
            /*
                        onApprovePress: async function () {
                            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                            const oModel = this.getOwnerComponent().getModel();
                            var oGlobalModel = this.getView().getModel("oGlobalModel");
                            //condiotion check
                            if ((oGlobalModel.getProperty("/isVBox1Visible") === true) && (oGlobalModel.getProperty("/REMARK1") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory1"), {
                                    title: "Error"
                                });
                                return; // Stop further execution
                            }
                            else if ((oGlobalModel.getProperty("/isVBox2Visible") === true) && (oGlobalModel.getProperty("/REMARK2") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory2"), {
                                    title: "Error"
                                });
                                return;
                            }
                            else if ((oGlobalModel.getProperty("/isVBox3Visible") === true) && (oGlobalModel.getProperty("/REMARK3") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory3"), {
                                    title: "Error"
                                });
                                return;
                            }
            
            
                            //
                            var remarkspresent = [];
                            var remark1 = oGlobalModel.getProperty("/REMARK1");
                            var remark2 = oGlobalModel.getProperty("/REMARK2");
                            var remark3 = oGlobalModel.getProperty("/REMARK3");
                            if (remark1 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK1"));
                            }
                            if (remark2 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK2"));
                            }
                            if (remark3 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK3"));
                            }
                            var mergedRemarks = [...remarkspresent, ...this.remarksToSend];
                            var uniqueRemark = mergedRemarks.filter(item => mergedRemarks.indexOf(item) === mergedRemarks.lastIndexOf(item))[0];
            
                            if (!uniqueRemark || uniqueRemark.trim() === "") {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory"), {
                                    title: oResourceBundle.getText("errorTitle")
                                });
                                return; // Stop execution if the remark is empty
                            }
                            let filter = {
                                "Action": "ONAPPROVE",
                                "employeeid": this.employeeId,
                                "wfid": this.wfId,
                                "Remarks": uniqueRemark
                            };
            
                            let sFilter = JSON.stringify(filter);
                            filter = { "Input": sFilter };
                            oModel.create("/EntitySet", filter, {
                                success: function (oData) {
                                    const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                                    sap.m.MessageBox.success(oResourceBundle.getText("approvalSuccess"), {
                                        title: "Success",
                                        onClose: function () {
                                            window.history.go(-1);
            
                                        }
                                    });
                                }.bind(this), // Ensure the correct context for `this`
                                error: function (oError) {
                                    var errorResponse = JSON.parse(oError.responseText);
                                    var message = errorResponse.error.message.value;
                                    sap.m.MessageBox.error(message, {
                                        title: "Error"
                                    });
                                }.bind(this) // Ensure the correct context for `this`
                            });
                        },
            
                        onRejectPress: function () {
                            const oModel = this.getOwnerComponent().getModel();
                            var oGlobalModel = this.getView().getModel("oGlobalModel");
                            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                            //condition check
                            if ((oGlobalModel.getProperty("/isVBox1Visible") === true) && (oGlobalModel.getProperty("/REMARK1") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory1"), {
                                    title: "Error"
                                });
                                return; // Stop further execution
                            }
                            else if ((oGlobalModel.getProperty("/isVBox2Visible") === true) && (oGlobalModel.getProperty("/REMARK2") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory2"), {
                                    title: "Error"
                                });
                                return;
                            }
                            else if ((oGlobalModel.getProperty("/isVBox3Visible") === true) && (oGlobalModel.getProperty("/REMARK3") === "")) {
                                sap.m.MessageBox.error(oResourceBundle.getText("remarkMandatory3"), {
                                    title: "Error"
                                });
                                return;
                            }
                            var remarkspresent = [];
                            var remark1 = oGlobalModel.getProperty("/REMARK1");
                            var remark2 = oGlobalModel.getProperty("/REMARK2");
                            var remark3 = oGlobalModel.getProperty("/REMARK3");
                            if (remark1 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK1"));
                            }
                            if (remark2 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK2"))
                            }
                            if (remark3 !== "") {
                                remarkspresent.push(oGlobalModel.getProperty("/REMARK3"));
                            }
                            var mergedRemarks = [...remarkspresent, ...this.remarksToSend];
                            var uniqueRemark = mergedRemarks.filter(item => mergedRemarks.indexOf(item) === mergedRemarks.lastIndexOf(item))[0];
            
                            var that = this
                            let filter = {
                                "Action": "ONREJECT",
                                "employeeid": this.employeeId,
                                "wfid": this.wfId,
                                "Remarks": uniqueRemark
                            };
                            let sFilter = JSON.stringify(filter);
                            filter = { "Input": sFilter };
                            oModel.create("/EntitySet", filter, {
                                success: function (oData) {
                                    console.log(oData);
                                    // Get the i18n model
                                    const oResourceBundle = that.getView().getModel("i18n").getResourceBundle();
                                    sap.m.MessageBox.success(oResourceBundle.getText("rejectionSuccess"), {
                                        title: "Success",
                                        onClose: function () {
                                            window.history.go(-1);
                                        }
                                    });
                                },
                                error: function (oError) {
                                    var errorResponse = JSON.parse(oError.responseText);
                                    var message = errorResponse.error.message.value;
                                    var result = message.split('').splice(7).join('');
                                    sap.m.MessageBox.error(result, {
                                        title: "Error"
                                    });
                                }
                            });
                        },
            
                        */
            onClearAllRemarksPress: function () {
                this.byId("_IDGenTextAreaRemarksApprover1").setValue("");
                this.byId("_IDGenTextAreaRemarksApprover2").setValue("");
                this.byId("_IDGenTextAreaRemarksApprover3").setValue("");
            },
            onToggleSwitch: function (oEvent) {
                // bSection8: true
                var oModelVisibility = this.getView().getModel("oModelVisibility");
                var bState = oEvent.getSource().getState();
                oModelVisibility.setProperty("/bTog_sec", bState);
                oModelVisibility.setProperty("/bMainSec", !bState);
                oModelVisibility.setProperty("/bFooter", !bState);
            },
            handleNext: function (oEvent) {
                var oModelVisibility = this.getView().getModel("oModelVisibility");

                var iCurrentSelection = oModelVisibility.getProperty("/currentSelection");
                var aSections = oModelVisibility.getProperty("/aSections");

                var level = this.getView().getModel("formModel").getData().level;
                var sText = this.getView().byId(`textAreaRemark${iCurrentSelection}${level}`).getValue();

                if (sText) {

                    aSections.forEach((element, index) => {
                        if (element == iCurrentSelection) {
                            oModelVisibility.setProperty(`/bSectionVis${element}`, false);

                            if (aSections.length > index + 1) {
                                oModelVisibility.setProperty(`/bSectionVis${aSections[index + 1]}`, true);
                                oModelVisibility.setProperty("/currentSelection", aSections[index + 1]);
                            } else if (aSections.length == index + 1) {
                                oModelVisibility.setProperty(`/bSectionVis${element}`, true);
                            }
                        } else {
                            if (aSections.indexOf(iCurrentSelection) + 1 !== index)
                                oModelVisibility.setProperty(`/bSectionVis${element}`, false);
                        }
                    });
                    iCurrentSelection = oModelVisibility.getProperty("/currentSelection");

                    if (aSections[aSections.length - 1] === iCurrentSelection) {
                        this.getView().byId("idNext").setEnabled(false);
                        this.getView().byId("idPrev").setEnabled(true);
                        this.getView().byId("idSubmit").setEnabled(true);
                    } else {
                        this.getView().byId("idNext").setEnabled(true);
                        this.getView().byId("idPrev").setEnabled(true);
                        this.getView().byId("idSubmit").setEnabled(false);
                    }
                    if (aSections[0] == iCurrentSelection) {
                        this.getView().byId("idPrev").setEnabled(false);
                    }
                } else {
                    MessageBox.error('Please enter remarks first!!');
                }
            },
            handlePrev: function (oEvent) {
                var oModelVisibility = this.getView().getModel("oModelVisibility");

                var iCurrentSelection = oModelVisibility.getProperty("/currentSelection");
                var aSections = oModelVisibility.getProperty("/aSections");

                aSections.forEach((element, index) => {
                    if (element == iCurrentSelection) {
                        oModelVisibility.setProperty(`/bSectionVis${element}`, false);

                        if (index !== 0) {
                            oModelVisibility.setProperty(`/bSectionVis${aSections[index - 1]}`, true);
                            oModelVisibility.setProperty("/currentSelection", aSections[index - 1]);
                        }
                    } else {
                        if (aSections.indexOf(iCurrentSelection) + 1 !== index)
                            oModelVisibility.setProperty(`/bSectionVis${element}`, false);
                    }
                });

                iCurrentSelection = oModelVisibility.getProperty("/currentSelection");

                if (aSections[0] === iCurrentSelection) {
                    this.getView().byId("idPrev").setEnabled(false);
                } else {
                    this.getView().byId("idNext").setEnabled(true);
                    this.getView().byId("idPrev").setEnabled(true);
                    this.getView().byId("idSubmit").setEnabled(false);
                }
            },

            onSubmitPress: function (oEvent) {

                var oModelVisibility = this.getView().getModel("oModelVisibility");
                var aSections = oModelVisibility.getProperty("/aSections");
                var level = this.getView().getModel("formModel").getData().level;
                var oPayload = {};
                aSections.forEach((section, index) => {
                    var sSelection = this.getView().byId(`idRB${section}${level}`).getSelectedIndex();
                    var sText = this.getView().byId(`textAreaRemark${section}${level}`).getValue();
                    var temp = {};
                    temp[`STATUS${level}`] = sSelection == 0 ? 'A' : 'R';
                    temp[`REMARKS${level}`] = sText;

                    oPayload[`SECTION${section}`] = JSON.stringify(temp);
                })


                oPayload["Action"] = "ONSUBMIT";
                oPayload["employeeid"] = this.employeeId;
                oPayload["wfid"] = this.wfId;

                var input = JSON.stringify(oPayload);

                const oModel = this.getOwnerComponent().getModel();
                oModel.create("/EntitySet", { "Input": input }, {
                    success: function (oData) {
                        const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                        sap.m.MessageBox.success(oResourceBundle.getText("approvalSuccess"), {
                            title: "Success",
                            onClose: function () {
                                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                oRouter.navTo("RouteApp");
                            }.bind(this)
                        });
                    }.bind(this), // Ensure the correct context for `this`
                    error: function (oError) {
                        var errorResponse = JSON.parse(oError.responseText);
                        var message = errorResponse.error.message.value;
                        if (message == 'I::000 No Data Found   '){
                            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                            sap.m.MessageBox.success(oResourceBundle.getText("approvalSuccess"), {
                                title: "Success",
                                onClose: function () {
                                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                                    oRouter.navTo("RouteApp");
                                }.bind(this)
                            });
                        }else{
                            MessageBox.error((message), {
                                title: "Error",
                                onClose: function () {
                                }
                            });
                        }
                    }.bind(this) // Ensure the correct context for `this`
                });


            }
        })
    });