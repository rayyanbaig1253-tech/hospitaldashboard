module.exports=[96049,a=>{"use strict";let b=(0,a.i(17771).default)("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);a.s(["Loader2",()=>b],96049)},44449,a=>{"use strict";let b=(0,a.i(17771).default)("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]);a.s(["Trash2",()=>b],44449)},93859,a=>{"use strict";let b=(0,a.i(17771).default)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["Check",()=>b],93859)},47221,29403,a=>{"use strict";let b=(0,a.i(17771).default)("printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);a.s(["Printer",()=>b],47221),a.s(["printInvoice",0,(a,b)=>{let c=window.open("","_blank","width=400,height=600");if(!c)return;let d=a.items.reduce((a,b)=>a+Number(b.price)*Number(b.quantity),0),e=a.discount||0,f=new Date,g=`
        <html>
            <head>
                <title>Print Invoice</title>
                <style>
                    body {
                        font-family: 'Courier New', Courier, monospace;
                        width: 72mm; /* Standard thermal width active area */
                        margin: 0;
                        padding: 2mm;
                        font-size: 11px;
                        line-height: 1.1;
                    }
                    .text-center { text-align: center; }
                    .text-right { text-align: right; }
                    .bold { font-weight: bold; }
                    .divider { border-top: 1px dashed #000; margin: 3px 0; }
                    .header h1 { margin: 0; font-size: 18px; }
                    .item-row { display: flex; justify-content: space-between; margin-bottom: 3px; }
                    .item-details { font-size: 9px; margin-left: 5px; }
                    .totals-box { border: 1px solid #000; padding: 4px; margin: 8px 0; }
                    @media print {
                        @page { 
                            size: 80mm auto; 
                            margin: 0; 
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header text-center">
                    <h1>MediStock</h1>
                    <div>SHAHRAH-E-PAKISTAN, KARACHI</div>
                    <div>UAN: 021 111 246 246</div>
                    <br/>
                    <div class="bold">Original Receipt</div>
                </div>

                <div class="divider"></div>

                <div class="item-row">
                    <span>Receipt # ${a.id.toString().padStart(8,"0")}</span>
                    <span>Pos: POS-101</span>
                </div>
                <div class="item-row">
                    <span>Date: ${f.toLocaleDateString()}</span>
                    <span>Time: ${f.toLocaleTimeString()}</span>
                </div>
                <div>User: ${b||"ADMIN CORE"}</div>
                <div>Customer: WALK-IN CUSTOMER</div>

                <div class="divider"></div>
                <div class="bold">Pack Unit     Gross  DisAmt  Item Total</div>
                <div class="divider"></div>

                ${a.items.map(a=>`
                    <div class="bold">${a.name.toUpperCase()}</div>
                    <div class="item-row">
                        <span class="item-details">${a.qtyDisplay||`${a.quantity.toString().padStart(2,"0")}  00`}</span>
                        <span>${(Number(a.price)*Number(a.quantity)).toFixed(2)}</span>
                    </div>
                `).join("")}

                <div class="divider"></div>
                <div class="item-row bold">
                    <span>Total</span>
                    <span>${a.items.length} items</span>
                    <span>${a.total.toFixed(0)}</span>
                </div>
                
                <div class="text-center" style="font-size: 10px; margin-top:5px;">
                    Total Gross    Total Discount    Total Net<br/>
                    <span class="bold">${d.toFixed(0)}            ${e.toFixed(0)}            ${a.total.toFixed(0)}</span>
                </div>

                <div class="totals-box">
                    <div class="item-row" style="align-items: center;">
                        <span style="font-size: 10px;">Invoice Value</span>
                        <span style="font-size: 20px;" class="bold">${a.total.toLocaleString()}</span>
                    </div>
                </div>

                <div class="text-center bold">Mode Of Payment</div>
                <div class="divider"></div>
                <div class="item-row">
                    <span>CASH</span>
                    <span>${a.total.toFixed(2)}</span>
                </div>
                <div class="item-row bold">
                    <span>Total Payment :</span>
                    <span>${a.total.toFixed(2)}</span>
                </div>

                <div class="divider"></div>
                <div class="item-row">
                    <span>CashReceived:</span>
                    <span>${(a.paidAmount||0).toFixed(0)}</span>
                </div>
                <div class="item-row">
                    <span>CashRefund:</span>
                    <span>${(a.changeAmount||0).toFixed(0)}</span>
                </div>

                <div class="divider"></div>
                <div class="text-center bold" style="font-size: 10px;">CUSTOMER RESPONSIBILITY</div>
                <div class="text-center" style="font-size: 9px;">
                    *Please Check Your Medicine By Prescription &<br/>
                    Expiry Date Of Medicine Yourself, Or Through<br/>
                    Your Medical Consultant<br/>
                    *In Case Of Any Doubt Of Wrong Medicine, It<br/>
                    May Be Returned<br/>
                    *Please Match Your Purchased Items With The<br/>
                    Bill. In Case Of Any Discrepancy, Call Our<br/>
                    Helpline Or Whatsapp Us On The Number Below.
                </div>

                <div style="margin-top: 10px;" class="text-center bold">
                    For Complaints, Please<br/>
                    <span style="font-size: 14px;">WhatsApp 0302-8647611</span>
                </div>

                <div style="margin-top: 10px;" class="text-center bold">
                    THANKYOU & COME AGAIN
                </div>

                <script>
                    window.onload = function() {
                        window.print();
                        setTimeout(() => window.close(), 100);
                    };
                </script>
            </body>
        </html>
    `;c.document.write(g),c.document.close()}],29403)}];

//# sourceMappingURL=3e618_lucide-react_dist_esm_icons_361f1529._.js.map