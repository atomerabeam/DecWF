sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("zdecwfapp.controller.App", {
            onInit: async function () {
                const oEmployeeModel = new JSONModel();
                this.getView().setModel(oEmployeeModel, "aModel");

                this.getView().setModel(new sap.ui.model.json.JSONModel({ EMPNO: [] }), "oModelD");
                this.getView().getModel("oModelD").setProperty("/GJAHR", new Date());

                this.loadData();
                this.byId("idEmployeeList").getBinding("items").refresh(true);
                var oGlobalModel = this.getOwnerComponent().getModel('oGlobalModel');
                oGlobalModel.updateBindings(true);

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteApp").attachPatternMatched(this._onObjectMatched, this);

                
            },
            loadData: function () {
                const oModel = this.getOwnerComponent().getModel();
                var oGlobalModel = this.getOwnerComponent().getModel('oGlobalModel')
                this.getView().setBusy(true);
                var aFilters = [];
                var sGJAHR = this.getView().getModel("oModelD").getProperty("/GJAHR");
                sGJAHR ? aFilters.push(new sap.ui.model.Filter("GJAHR", "EQ", sGJAHR.getFullYear())) : '';
                let filter = { "Action": "GETLIST", "FILTER": aFilters  };  //'{"Action":"GETLIST","Approverid":"PV001251"}'
                let sFilter = JSON.stringify(filter);
                filter = { "Input": sFilter };

                var sUrl = "/EntitySet('" + encodeURIComponent(sFilter) + "')";
                oModel.read(sUrl, {
                    success: function (oData) {
                        this.getView().setBusy(false);
                        try {
                            const data = JSON.parse(oData.Output); // Parse the response                           
                            if (data.DATA) {
                                this.getView().getModel("aModel").setProperty("/EmployeeList", data.DATA)
                            }
                            oGlobalModel.updateBindings(true);
                            this.getView().getModel("aModel").updateBindings(true);
                        } catch (e) {
                            throw new Error('Unable to parse the data');
                        }
                    }.bind(this),
                    error: function (oError) {
                        this.getView().setBusy(false);
                        this.getView().getModel("aModel").setProperty("/EmployeeList",[]);
                        // var message = JSON.parse(oError.responseText).error.message.value;
                        oGlobalModel.updateBindings(true);
                        this.getView().getModel("aModel").updateBindings(true);
                        // sap.m.MessageBox.warning((message.split('').splice(7).join('')), {
                        // MessageBox.warning((message), {
                        //     title: "Warning",
                        //     onClose: function () {
                        //     }
                        // });
                    }.bind(this)
                });
            },

            _onObjectMatched: function (oEvent) {
                this.loadData();
            },
            onRowPress: function (oEvent) {
                var oItem = oEvent.getSource();
                var oContext = oItem.getBindingContext("aModel");
                var sRequestId = oContext.getProperty("PERNR");
                var sWfId = oContext.getProperty("WFID");
                var sHead = oContext.getProperty("HR_HEAD");
                this.getView().setBusy(true);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteEmpDetails", {
                    wfId: sWfId,
                    requestId: sRequestId
                });
            },
            onSearch: function (oEvent) {                

                let sValue = oEvent.getSource().getValue().toString();

                let aFilters = [];
                aFilters.push(new sap.ui.model.Filter({
                    path: "PERNR",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "STATUS",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "GJAHR",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "ENAME",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "DEPARTMENT",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "COMPANYENTITY",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "STATUS",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "PENDING_WITH",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                aFilters.push(new sap.ui.model.Filter({
                    path: "BUSINESSUNIT",
                    operator: sap.ui.model.FilterOperator.Contains,
                    value1: sValue
                }));
                
                var oCombinedFilter = new sap.ui.model.Filter({
                    filters: aFilters,
                    and: false // Use 'true' for AND condition, so both conditions must be met
                });
                this.getView().byId('idEmployeeList').getBinding("items").filter(oCombinedFilter);
            },
            onFilter: function (oEvent) {
                const oModel = this.getOwnerComponent().getModel();
                var oGlobalModel = this.getOwnerComponent().getModel('oGlobalModel')
                this.getView().setBusy(true);
                var aFilters = [];
                var sPERNR = this.getView().byId("idFilEmpNo").getValue();
                sPERNR ? aFilters.push(new sap.ui.model.Filter("PERNR", "EQ", sPERNR)) : '';
                var sGJAHR = this.getView().getModel("oModelD").getProperty("/GJAHR");
                sGJAHR ? aFilters.push(new sap.ui.model.Filter("GJAHR", "EQ", sGJAHR.getFullYear())) : '';
                var sSTATUS = this.getView().byId("idFilStatus").getValue();
                sSTATUS ? aFilters.push(new sap.ui.model.Filter("STATUS", "EQ", sSTATUS)) : '';
                // aFilters.push({ "Action": "FILTER" });

                let filter = { "Action": "FILTER", "FILTER": aFilters };  //'{"Action":"GETLIST","Approverid":"PV001251"}'
                let sFilter = JSON.stringify(filter);
                //  filter = { "Input": sFilter };

                var sUrl = "/EntitySet('" + encodeURIComponent(sFilter) + "')";
                oModel.read(sUrl, {
                    success: function (oData) {
                        this.getView().setBusy(false);
                        try {
                            const data = JSON.parse(oData.Output); // Parse the response
                            if (data.DATA) {
                                this.getView().getModel("aModel").setProperty("/EmployeeList", data.DATA)
                            }
                            oGlobalModel.updateBindings(true);
                            this.getView().getModel("aModel").updateBindings(true);
                        } catch (e) {
                            throw new Error('Unable to parse the data');
                        }
                    }.bind(this),
                    error: function (oError) {
                        this.getView().setBusy(false);
                            this.getView().getModel("aModel").setProperty("/EmployeeList", []);
                        oGlobalModel.updateBindings(true);
                        this.getView().getModel("aModel").updateBindings(true);
                        // var message = JSON.parse(oError.responseText).error.message.value;
                        // MessageBox.warning((message), {
                        //     title: "Warning",
                        //     onClose: function () {
                        //     }
                        // });
                    }.bind(this)
                });
            }
            

        });
    });
