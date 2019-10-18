import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { RequestOptions, Headers } from '@angular/http';
@Injectable({
  providedIn: 'root'
})

export class LocalDataService implements OnInit {

  constructor(private http: HttpClient) { }
   
    ngOnInit(){
}

  localStorageValue()
  {
      let full= Object()
    ////step 1 local value
    let locass = localStorage.getItem('asset');
    if(locass) full.localassetv = JSON.parse(locass);
   
    let locmar = localStorage.getItem('market');
   if(locmar) full.localmarketv = JSON.parse(locmar);

   let locpropfor = localStorage.getItem('propertyfor');
   if(locpropfor) full.locpropforv = JSON.parse(locpropfor);
   
  let locpre = localStorage.getItem('prebuilt')
   if(locpre) full.localprebuiltv = JSON.parse(locpre);

   let othervalue = localStorage.getItem('othervalue')
   if(othervalue) full.othervaluev = JSON.parse(othervalue);

   let locmcategory = localStorage.getItem('marketcategory')
   if(locmcategory) full.locmcategoryv = JSON.parse(locmcategory);



   let locparking = localStorage.getItem('parkingavailability');
   if(locparking) full.localparkingtypev = JSON.parse(locparking);

   let locbalconyavail = localStorage.getItem('balconyfacavail');
   if(locbalconyavail) full.locbalconyavailv = JSON.parse(locbalconyavail);

   let locfrontbackyardavail = localStorage.getItem('fronbackyardavail');
   if(locfrontbackyardavail) full.locfrontbackyardavailv = JSON.parse(locfrontbackyardavail);


   
   

   let locparkinginfo = localStorage.getItem('parkingavail');
   if(locparkinginfo) full.locparkinginfov = JSON.parse(locparkinginfo);

  let locutil = localStorage.getItem('utilitiestype');
  if(locutil) full.localutilitiesv = JSON.parse(locutil);

  let locrawfacility = localStorage.getItem('rawfacilities');
  if(locrawfacility) full.locrawfacilityv = JSON.parse(locrawfacility);


  let loccommun = localStorage.getItem('communitytype');
  if(loccommun) full.localcommunityv = JSON.parse(loccommun);

  let locecofac = localStorage.getItem('ecofacilitytype');
  if(locecofac) full.localecofacilityv = JSON.parse(locecofac);

   let locflortype = localStorage.getItem('flooringtype');
  if(locflortype) full.localflooringtypev = JSON.parse(locflortype);
   
   let locmartype = localStorage.getItem('ceilingtype');
   if(locmartype) full.localceilingtypev = JSON.parse(locmartype);

   let locfurnishstatus = localStorage.getItem('furnishstatus');
   if(locfurnishstatus) full.localfurnishstatusv = JSON.parse(locfurnishstatus);

   let lochomeware = localStorage.getItem('homewares');
   if(lochomeware) full.lochomewarev = JSON.parse(lochomeware);

   let lockitchenware = localStorage.getItem('kitchenwares');
   if(lockitchenware) full.lockitchenwarev = JSON.parse(lockitchenware);

   let locappliance = localStorage.getItem('appliance');
   if(locappliance) full.locappliancev = JSON.parse(locappliance);

   let locfurnitureware = localStorage.getItem('furnitureware');
   if(locfurnitureware) full.locfurniturewarev = JSON.parse(locfurnitureware);

   let locommfurnit = localStorage.getItem('commfurniture');
   if(locommfurnit) full.locommfurnitv = JSON.parse(locommfurnit);

   let locommelectronic = localStorage.getItem('commelectronic');
   if(locommelectronic) full.locommelectronicv = JSON.parse(locommelectronic);

   let locconstuctionphase = localStorage.getItem('constructionphase');
   if(locconstuctionphase) full.locconstuctionphasev = JSON.parse(locconstuctionphase);

   let locfinalizeinventory = localStorage.getItem('finalizeinventory');
   if(locfinalizeinventory) full.locfinalizeinventoryv = JSON.parse(locfinalizeinventory);

   let locapprovaltype = localStorage.getItem('approvaltype');
   if(locapprovaltype) full.locapprovaltypev = JSON.parse(locapprovaltype);

  
   let localothertype = localStorage.getItem('otherapprovalinput');
   if(localothertype) full.localothertypev = (localothertype);

   let locecother = localStorage.getItem('ecotherinputdata');
   if(locecother) full.locecotherv = (locecother);



   let fileuploaddata = localStorage.getItem('fileimagedata');
   if(fileuploaddata) full.fileuploaddatav = JSON.parse(fileuploaddata);

 

   let fileBluePrintData = localStorage.getItem('fileblueprint');
   if(fileBluePrintData) full.fileBluePrintDatav = JSON.parse(fileBluePrintData);

   let filerawproperty = localStorage.getItem('rawproperty');
   if(filerawproperty) full.filerawpropertyv = JSON.parse(filerawproperty);

   let filelandmap = localStorage.getItem('filelandmap');
   if(filelandmap) full.filelandmapv = JSON.parse(filelandmap);

   let fileownerdoc = localStorage.getItem('fileownerdoc');
   if(fileownerdoc) full.fileownerdocv = JSON.parse(fileownerdoc);

  //  localStorage.setItem("maplocation",results[0].formatted_address);

   let locmaplocation = localStorage.getItem('maplocation');
   if(locmaplocation) full.locmaplocationv = (locmaplocation);

   let filesaleseed = localStorage.getItem('saleseed');
   if(filesaleseed) full.filesaleseedv = JSON.parse(filesaleseed);

   let fileTitlecertify = localStorage.getItem('titlecertify');
   if(fileTitlecertify) full.fileTitlecertifyv = JSON.parse(fileTitlecertify);

   let fileduecertify = localStorage.getItem('duecertify');
   if(fileduecertify) full.fileduecertifyv = JSON.parse(fileduecertify);

   let filelandcertify = localStorage.getItem('landcertify');
   if(filelandcertify) full.filelandcertifyv = JSON.parse(filelandcertify);

   let approvecertify = localStorage.getItem('approvecertify');
   if(approvecertify) full.approvecertifyv = JSON.parse(approvecertify);

   let fileclearcertify = localStorage.getItem('clearcertify');
   if(fileclearcertify) full.fileclearcertifyv = JSON.parse(fileclearcertify);

   let filevaluecertify = localStorage.getItem('valuecertify');
   if(filevaluecertify) full.filevaluecertifyv = JSON.parse(filevaluecertify);

   let locfacingvalue = localStorage.getItem('rawfacingvalue');
   if(locfacingvalue) full.locfacingvaluev = JSON.parse(locfacingvalue);

   let locfacingfield = localStorage.getItem('rawfacingfield');
   if(locfacingfield) full.locfacingfieldv = JSON.parse(locfacingfield);


   let lockhatanum = localStorage.getItem('khatanumber');
   if(lockhatanum) full.lockhatanumv = lockhatanum;

   let lockhasranum = localStorage.getItem('khasranumber');
   if(lockhasranum) full.lockhasranumv = lockhasranum;

   let locacres = localStorage.getItem('acresvalue');
   if(locacres) full.locacresv = JSON.parse(locacres);

   let locacresarea = localStorage.getItem('totalarea');
   if(locacresarea) full.locacresareav = JSON.parse(locacresarea);

   let locownerdata = localStorage.getItem('ownerdata');
   if(locownerdata) full.locownerdatav = locownerdata;

   let loccurrentownerdata = localStorage.getItem('localcurrownerdata');
   if(loccurrentownerdata) full.loccurrentownerdatav = loccurrentownerdata;

   let locyeardoc = localStorage.getItem('yeardocument');
   if(locyeardoc) full.locyeardocv =locyeardoc;

   let locpaymentplan = localStorage.getItem('paymentplan');
   if(locpaymentplan) full.locpaymentplanv = JSON.parse(locpaymentplan);

   let pincodedata = localStorage.getItem('pincode');
   if(pincodedata) full.pincodedatav = JSON.parse(pincodedata);

   let locdimunit = localStorage.getItem('dimensionunit');
   if(locdimunit) full.locdimunitv = JSON.parse(locdimunit);

   let locsuperarea = localStorage.getItem('Superarea');
   if(locsuperarea) full.locsuperareav = JSON.parse(locsuperarea);

   let builtarea = localStorage.getItem('Builtarea');
   if(builtarea) full.builtareav = JSON.parse(builtarea);

   let localocat1 = localStorage.getItem('nearlocat');
   if(localocat1) full.localocat1v = JSON.parse(localocat1);

   let locoperational = localStorage.getItem('operationalFloor');
   if(locoperational) full.locoperationalv = JSON.parse(locoperational);

   let lococonfernce = localStorage.getItem('conferenceRoom');
   if(lococonfernce) full.lococonferncev = JSON.parse(lococonfernce);

   let locabins = localStorage.getItem('cabins');
   if(locabins) full.locabinsv = JSON.parse(locabins);

   let loccafe = localStorage.getItem('cafeteria');
   if(loccafe) full.loccafev = JSON.parse(loccafe);

   let locreceiption = localStorage.getItem('reception');
   if(locreceiption) full.locreceiptionv = JSON.parse(locreceiption);

   let locwaithall = localStorage.getItem('waitingHall');
   if(locwaithall) full.locwaithallv = JSON.parse(locwaithall);

   let locnaproom = localStorage.getItem('napRoom');
   if(locnaproom) full.locnaproomv = JSON.parse(locnaproom);

   let locrecord = localStorage.getItem('recordRoom');
   if(locrecord) full.locrecordv = JSON.parse(locrecord);

   let locserver = localStorage.getItem('serverRoom');
   if(locserver) full.locserverv = JSON.parse(locserver);

   let locmachine = localStorage.getItem('machineRoom');
   if(locmachine) full.locmachinev = JSON.parse(locmachine);



   let locharvestype = localStorage.getItem('harvestype');
   if(locharvestype) full.locharvestypev = JSON.parse(locharvestype);   

   

   

   let facingarea = localStorage.getItem('facing');
   if(facingarea) full.facingareav = JSON.parse(facingarea);

   let carpetarea = localStorage.getItem('carpetarea');
   if(carpetarea) full.carpetareav = JSON.parse(carpetarea);
   
   let lockitchen = localStorage.getItem('kitchen');
   if(lockitchen) full.lockitchenv = JSON.parse(lockitchen);

   let lockitchentypeapi = localStorage.getItem('kitchentypeapis');
   if(lockitchentypeapi) full.lockitchentypeapiv = JSON.parse(lockitchentypeapi);

   let locbathtypeapi = localStorage.getItem('bathroomtypeapis');
   if(locbathtypeapi) full.locbathtypeapiv = JSON.parse(locbathtypeapi);


   let lockitchentype = localStorage.getItem('kitchentype');
   if(lockitchentype) full.lockitchentypev = JSON.parse(lockitchentype);

   let locbathroom = localStorage.getItem('bathroom');
   if(locbathroom) full.locbathroomv = JSON.parse(locbathroom);

   let locbathroomtype = localStorage.getItem('bathroomtype');
   if(locbathroomtype) full.locbathroomtypev = JSON.parse(locbathroomtype);



   let locbedroom = localStorage.getItem('room1');
   if(locbedroom) full.locbedroomv = JSON.parse(locbedroom);

   let loclivingroom = localStorage.getItem('room2');
   if(loclivingroom) full.loclivingroomv = JSON.parse(loclivingroom);

   let locstudyroom = localStorage.getItem('room3');
   if(locstudyroom) full.locstudyroomv = JSON.parse(locstudyroom);

   let locpoojaroom = localStorage.getItem('room4');
   if(locpoojaroom) full.locpoojaroomv = JSON.parse(locpoojaroom);

   let locservantroom = localStorage.getItem('room5');
   if(locservantroom) full.locservantroomv = JSON.parse(locservantroom);

   let locdiningroom = localStorage.getItem('room6');
   if(locdiningroom) full.locdiningroomv = JSON.parse(locdiningroom);

   let locstoreroom = localStorage.getItem('room7');
   if(locstoreroom) full.locstoreroomv = JSON.parse(locstoreroom);

   let locbasementroom = localStorage.getItem('room8');
   if(locbasementroom) full.locbasementroomv = JSON.parse(locbasementroom);


   let balcony = localStorage.getItem('balconyarea');
   if(balcony) full.balconyv = JSON.parse(balcony);

   let locbhkflat = localStorage.getItem('bhkflat');
   if(locbhkflat) full.locbhkflatv = JSON.parse(locbhkflat);

   let locfloor = localStorage.getItem('floor');
   if(locfloor) full.locfloorv = JSON.parse(locfloor);

   let loctotalfloor = localStorage.getItem('totalfloor');
   if(loctotalfloor) full.loctotalfloorv = JSON.parse(loctotalfloor);

   let frontyard = localStorage.getItem('frontyard');
   if(frontyard) full.frontyardv = JSON.parse(frontyard);

   let backyard = localStorage.getItem('backyard');
   if(backyard) full.backyardv = JSON.parse(backyard);

   let locroomcount = localStorage.getItem('roomcount');
   if(locroomcount) full.locroomcountv = JSON.parse(locroomcount);

   let locroomtype = localStorage.getItem('roomtype');
   if(locroomtype) full.locroomtypev = JSON.parse(locroomtype);

   let locprojname = localStorage.getItem('projectname');
   if(locprojname) full.locprojnamev = locprojname;

   let locprojdesc = localStorage.getItem('projectdesc');
   if(locprojdesc) full.locprojdescv = locprojdesc;

   let locexpected = localStorage.getItem('expectedprice');
   if(locexpected) full.locexpectedv = JSON.parse(locexpected);

   let locestimated = localStorage.getItem('estimateprice');
   if(locestimated) full.locestimatedv = JSON.parse(locestimated);

   let squarefeet = localStorage.getItem('squareareafeet');
   if(squarefeet) full.squarefeetv = JSON.parse(squarefeet);

   let locstate1 = localStorage.getItem('statearr');
   if(locstate1) full.locstate1v = JSON.parse(locstate1);

   let loccity1 = localStorage.getItem('citys');
   if(loccity1) full.loccity1v = loccity1;

   let locstate = localStorage.getItem('state');
   if(locstate) full.locstatev = locstate;

   let loccity = localStorage.getItem('city');
   if(loccity) full.loccityv = loccity;

   let locdistrict = localStorage.getItem('district');
   if(locdistrict) full.locdistrictv = locdistrict;

   let address = localStorage.getItem('address');
   if(address) full.addressv = address;

   let descr = localStorage.getItem('projectdesc');
   if(descr) full.descrv = descr;

   let village = localStorage.getItem('village');
   if(village) full.villagev = village;


   let agrbuilt = localStorage.getItem('agrbuilt');
   if(agrbuilt) full.agrbuiltv = agrbuilt;

   let agropenarea = localStorage.getItem('agropenarea');
   if(agropenarea) full.agropenareav = agropenarea;

   let locagrbuiltprice = localStorage.getItem('agrbuiltuprice');
   if(locagrbuiltprice) full.locagrbuiltpricev = locagrbuiltprice;

   let locfarmprice = localStorage.getItem('agrfarmareaprice');
   if(locfarmprice) full.locfarmpricev = locfarmprice;

   let latitude = localStorage.getItem('latitude');
   if(latitude) full.latitudev = JSON.parse(latitude);

   let longitude = localStorage.getItem('longitude');
   if(longitude) full.longitudev = JSON.parse(longitude);

   let locprofname = localStorage.getItem('profession');
   if(locprofname) full.locprofnamev = locprofname;

   let locname = localStorage.getItem('name');
   if(locname) full.locnamev = locname;

   let locontact = localStorage.getItem('contact');
   if(locontact) full.locontactv = locontact;

   let locemail = localStorage.getItem('email');
   if(locemail) full.locemailv = locemail;

   let locprodtype = localStorage.getItem('prodtype');
   if(locprodtype) full.locprodtypev = locprodtype;

   let locprodcap = localStorage.getItem('prodcapacity');
   if(locprodcap) full.locprodcapv = locprodcap;

   let locassembtype = localStorage.getItem('assemblytype');
   if(locassembtype) full.locassembtypev = locassembtype;

   let locassembcap = localStorage.getItem('assembcapacity');
   if(locassembcap) full.locassembcapv = locassembcap;

   let locworkshop = localStorage.getItem('indworkshop');
   if(locworkshop) full.locworkshopv = locworkshop;


   let locwarehouse = localStorage.getItem('indwarehouse');
   if(locwarehouse) full.locwarehousev = locwarehouse;

   let loclaboratory = localStorage.getItem('indlaboratory');
   if(loclaboratory) full.loclaboratoryv = loclaboratory;




   let locminprice = localStorage.getItem('minprice');
   if(locminprice) full.locminpricev = JSON.parse(locminprice);

   let locemaxprice = localStorage.getItem('maxprice');
   if(locemaxprice) full.locemaxpricev = JSON.parse(locemaxprice);


   let locadminarea = localStorage.getItem('commadminarea');
   if(locadminarea) full.locadminareav = JSON.parse(locadminarea);

   let locoperatarea = localStorage.getItem('commoperatarea');
   if(locoperatarea) full.locoperatareav = JSON.parse(locoperatarea);

   let loctotalarea = localStorage.getItem('commtotalarea');
   if(loctotalarea) full.loctotalareav = JSON.parse(loctotalarea);

   let locommopenarea = localStorage.getItem('commopenarea');
   if(locommopenarea) full.locommopenareav = JSON.parse(locommopenarea);

   let locadminoperat = localStorage.getItem('totaladminoperat');
   if(locadminoperat) full.locadminoperatv = JSON.parse(locadminoperat);

   let loctotalrate = localStorage.getItem('commtotalrate');
   if(loctotalrate) full.loctotalratev = JSON.parse(loctotalrate);

   let locommbuiltrate = localStorage.getItem('commbuiltrate');
   if(locommbuiltrate) full.locommbuiltratev = JSON.parse(locommbuiltrate);

   let locosafeutility = localStorage.getItem('safetyutiltype');
   if(locosafeutility) full.locosafeutilityv = JSON.parse(locosafeutility);
   

   let locagrbuiltrate = localStorage.getItem('agrbuiltuprate');
   if(locagrbuiltrate) full.locagrbuiltratev = JSON.parse(locagrbuiltrate);

   let locagrfarmarearate = localStorage.getItem('agrfarmarearate');
   if(locagrfarmarearate) full.locagrfarmarearatev = JSON.parse(locagrfarmarearate);


   let locminrawarea = localStorage.getItem('minrawarea');
   if(locminrawarea) full.locminrawareav = JSON.parse(locminrawarea);

   let locemaxrawarea = localStorage.getItem('maxrawarea');
   if(locemaxrawarea) full.locemaxrawareav = JSON.parse(locemaxrawarea);

   let loceminbuilt = localStorage.getItem('minbuiltarea');
   if(loceminbuilt) full.loceminbuiltv = JSON.parse(loceminbuilt);

   let locemaxbuilt = localStorage.getItem('maxbuiltarea');
   if(locemaxbuilt) full.locemaxbuiltv = JSON.parse(locemaxbuilt);

   let locemincarpet = localStorage.getItem('mincarpetarea');
   if(locemincarpet) full.locemincarpetv = JSON.parse(locemincarpet);

   let locemaxcarpet = localStorage.getItem('maxcarpetarea');
   if(locemaxcarpet) full.locemaxcarpetv = JSON.parse(locemaxcarpet);


   let locrefferal = localStorage.getItem('refferal');
   if(locrefferal) full.locrefferalv = locrefferal;




   let firststep = localStorage.getItem('firststep');
   if(firststep) full.firststepv = firststep;

   let secondstep = localStorage.getItem('secondstep');
   if(secondstep) full.secondstepv = secondstep;

   let thirdstep = localStorage.getItem('thirdstep');
   if(thirdstep) full.thirdstepv = thirdstep;

   let fourstep = localStorage.getItem('fourstep');
   if(fourstep) full.fourstepv = fourstep;

   let fivestep = localStorage.getItem('fivestep');
   if(fivestep) full.fivestepv = fivestep;

   let sixstep = localStorage.getItem('sixstep');
   if(sixstep) full.sixstepv = sixstep;

   let sevenstep = localStorage.getItem('sevenstep');
   if(sevenstep) full.sevenstepv = sevenstep;

   let locfacmanag = localStorage.getItem('facmanag');
   if(locfacmanag) full.locfacmanagv = JSON.parse(locfacmanag);

   let locpropgall = localStorage.getItem('propgall');
   if(locpropgall) full.locpropgallv = JSON.parse(locpropgall);

   let locpaysetp = localStorage.getItem('paystep');
   if(locpaysetp) full.locpaysetpv = JSON.parse(locpaysetp);

   

   return full;

  }



  

}    