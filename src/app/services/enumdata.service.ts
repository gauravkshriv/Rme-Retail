import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumdataService {


  constructor() { }

  kytname = new Map([

     ["SEMI_FURNISHED", "Semi Furnished"],

     ["AGRICULTURAL", "Agricultural"],

     ["FINISHING_MODE", "Finishing Mode"],

     ["MIDDLEWAY_CONSTRUCTION", "Middleway Construction"],

     ["MIDDLE_WAY_CONSTRUCTION","Middle Way Construction"],

     ["TRADITIONAL_STYLE", "Traditional Style"],

     ["TRADITIONAL","Traditional"],

     ["WESTERN","Western"],

     ["FRENCH","French"],

     ["GERMAN","German"],



     ["MODULAR_KITCHEN","Modular Kitchen"],

     ["WESTERN_STYLE", "Western Style"],

     ["WESTERN","Western Style"],

     ["FRENCH_STYLE", "French Style"],
     
     ["ITALIAN_STYLE","Italian Style"],

     ["GERMAN_STYLE", "German Style"],

     ["FULLY_FURNISHED", "Fully Furnished"],

     ["FRONT_YARD","Front yard"],

     ["BACK_YARD","Back yard"],

     ["NORTH_EAST","North East"],

     ["NORTH_WEST","North West"],

     ["SOUTH_WEST","South West"],

     ["SOUTH_EAST","South East"],

     ["NORTH","North"],

     ["WEST","West"],

     ["SOUTH","South"],

     ["PERCENTAGE","Percentage"],

     ["",""],

     ["WITHIN_ONE_MONTH", "Within One Month"],

     ["NEXT_QUATER", "Next Quarter"],

     ["NEXT_SIX_MONTHS", "Next Six Month"],

     ["NEXT_YEAR", "Next Year"],

     ["WOODEN_FINISH","Wooden Finish"],

     ["ATTACHED","Attached"],

     ["SEPERATED","Separated"],

     

     ["ONE_BHK","One BHK"],

     ["FOUR_BHK","Four BHK"],

     ["TWO_BHK","Two BHK"],

     ["THREE_BHK","Three BHK"],

     ["FIVE_BHK","Five BHK"],

     ["SEMI_AUTOMATIC_WASHING_MACHINE","Semi Automatic Washing Machine"],

     ["OTHERS","Others"],

     ["STUDY_TABLE", "Study Table"],

     ["SHOE_SHELF", "Shoe Shelf"],

     ["CENTRE_TABLE","Centre Table"],

     ["BOOK_SHELVES","Book Shelves"],

     ["WATER_PURIFIER","Water Purfier"],

     ["FULLY_AUTOMATIC_WASHING_MACHINE","Fully Automatic Washing Machine"],

     ["EXHAUST_FANS","Exhaust Fans"],

     ["FANS","Fans"],

     ["LIGHTS","Lights"],

     ["FRIDGE","Fridge"],

     ["GEYSER","Geyser"],

     ["TELEVISION","Television"],

     ["AIR_PURIFIER","Air Purifier"],

     ["CHIMNEY","Chimney"],

     ["COMPUTER","Comuter"],
     ["CHANDELIER","Chandelier"],
     ["CUTLERY","Cutlery"],
     ["INTERNET","internet"],
     ["CROCKERY","Crokery"],

     ["OVEN","Oven"],
     ["GRILLER","Griller"],
     ["BLENDER","Blender"],
     ["SOFA","Sofa"],
     ["DINING_SET","Dining Set"],
     ["BED","Bed"],
     ["WARDROBES","Wardrobes"],
     ["ALMIRAH","Almirah"],
     ["CURTAINS","Curtains"],
     ["CARPET","Carpet"],
     ["ESCALATORS","Escalators"],

     ["POWER_POINT_SOCKETS","Power Point Socket"],

     ["JUICER_MIXER_GRINDER","Juicer,Mixer,Grinder"],

     ["PRE_LAUNCHING","Pre Launching"],

     ["RECLINER_AND_ROCKER", "Recliner and Rocker"],

     ["TV_UNIT", "Tv Unit"],

     ["BAR_CABINETS", "Bar Cabinet"],

     ["JUICER_MIXER_GRINDER", "Juicer Mixer Grinder"],

     ["VACCUM_CLEANER", "Vaccum Cleaner"],

     ["WATER_STORAGE", "Water Storage"],

     ["IRONING_BOARD", "Ironing Road"],

     ["DISH_CABLE", "Dish Cable"],

     ["ELECTRIC_COOKER", "Electic Cooker"],

     ["ELECTRIC_KETTLE", "Electric Kettle"],

     ["INDUCTION_COOKING_UNIT", "Induction Cooking Unit"],

     ["GAS_COOKING_UNIT", "Gas Cooking Unit"],

     ["AIR_CONDITION", "Air Condition"],

     ["RESERVED_PARKING","Reserved Parking"],

     ["SHARED_PARKING","Shared Parking"],

     ["CENTRAL_AIR_CONDITION","Central Air Condition"],

     ["GYM","Gym"],

     ["INDIAN","Indian"],

     ["WESTERN","Western"],

     ["ITALIAN","Italian"],

     ["FRENCH","French"],

     ["HOUSE_KEEPING","House Keeping"],

     ["GAS_PIPELINES","Gas Pipelines"],
     
     ["OFFICE_BUILDING","Office Building"],

     ["OFFICE_FLOOR","Office Floor"],

     ["SPECIAL_ECONOMIC_ZONE","Special Economic Zone"],

     ["COLD_STORAGE","Cold Storage"],

     ["POLUTARY_LAND","Poultry land"],

     ["FARM_HOUSE","Farm House"],

     ["FARM_LAND","Farm Land"],

     ["TILE_FINISH","Tile Finish"],

     ["BORDER_FINISISHING","Border Finishing"],

     ["CORNIS_FINISHING","Cornis Finishing"],

     ["SEWER_LINES", "Sewer Lines"],

     ["SECURITY_SERVICES","Security Services"],

     ["LAUNCHING","Launching"],



     

     ["ELECTRIFICATION","Electrification"],

     ["GATED_SOCIETY","Gated Society"],

     ["LIFTS","Lift"],

     ["EAST","East"],

     ["LOCAL_AUTHORITY_APPROVAL","Local Authority Approval"],

     ["MARBEL_FINISH","Marble Finish"],

     ["PARK", "Park"],

     ["CCTV","CCTV"],

     ["POWER_BACKUP","Power Backup"],

     ["RAIN_WATER_HARVESTING","Rain Water Harvesting"],

     ["FALSE_SEALING","False Sealing"],

     ["MOTOR_PUMP","Motor Pump"],

     ["OPEN_PARKING","Open Parking"],

     ["SWIMMING_POOL","Swimming pool"],

     ["SOLAR_PANELS","Solar Panels"],

     ["RAW_ASSET","Raw Asset"],

     ["RAW","Raw"],
     
     ["PRIMARY_MARKET","Primary Market"],

     ["READY_TO_MOVE","Ready To Move"],

     ["UNFURNISHED","Unfurnished"],

     ["WATER_SUPPLY","Water Supply"],

     ["VILLA","Villa"],

     ["ONE_BHK","One Bhk"],

     ["TWO_BHK","Two Bhk"],

     ["BUILDER" , "Builder"],
   
     ["LAND_UPLOAD" , "Land owner"],
    
     ["END_USER_BUYER" , "Buyer"],
    
     ["END_USER_INVESTOR" , "Buyer Investor"],
    
     ["LAND_DEVELOPER" , "Land Developer"],
   
     ["LAND_OWNER" , "Land Owner"],
    
     ["BROKING_HOUSE" , "Broking House"],
       
     ["PROJECT_PARTICIPANT" , "Project Participant"],
    
     ["CONSULTANT" , "Consultant"],
    
     ["PROJECT_INVESTOR" , "Project Investor"],
    
     ["PROJECT_MENTOR" , "Project Mentor"],
   
     ["PRIMARY_MARKET" , "Primary Market"],
   
     ["SECONDARY_MARKET" , "Secondary Market"],
    
     ["PROJECT_HEAD" , "Project Head KYT"],
    
     ["LEGAL_CONSULATANT" , "Legal Consultant KYT"],
 
     ["IT_CONSULTANT", "IT Consultant"],
 
     ["MORTGAGE_CONSULTANT", "Mortgage Consultant"],
 
     ["ARCHITECTURE_CONSULTANT", "Architecture Consultant"],
 
     ["CONSTRUCTION_CONSULTANT", "Construction Consultant"],
 
     ["TRAINER","Trainer"],
 
     ["POOL_MENTOR","Pool Mentor"],
 
     ["DESIGNING_CONSULTANT", "Designing Consultant"],
 
     ["VENDOR", "Vendor"],
 
     ["END_USER_BUYER", "End User Buyer"],
 
     ["END_USER_INVESTOR", "End User Investor"],
    
     ["DATA_MANAGEMENT_CONSULTANT" , "Database Management"],
    
     ["INVESTMENT_BROKING_CONSULTANT" , "Broking Consultant"],
 
     ["PROJECT_INVESTMENT_CONSULTANT", "Project Investment Consultant"],
     
     ["BROKING_CONSULTANT", "Broking Consultant"],
    
     ["PROJECT_MENTOR_LAND_UPLOAD" , "Project Mentor Land Upload"],
 
     ["NEED_ANALYSIS", "Need Analysis"],
 
     ["RISK_ANALYSIS","Risk Analysis"],
 
     ["SALES_CLOSING", "Sales Closing"],
 
     ["DIGITAL_MEDIA_MARKETING", "Digital Media Marketing"],
 
     ["LAND_INVESTMENT", "Land Investment"],
 
     ["VC_INVESTMENT","V C investment"],
 
     ["LAND_DUE_DILIGENCE","Land Due Dilligence"],
 
     ["PROJECT_DUE_DILIGENCE","Project Due Dilligence"],
 
     ["PROPERTY_DUE_DILIGENCE","Property Due Dilligence"],
 
     ["MORTGAGE_DUE_DILIGENCE", "Mortgage Due Dilligence"],
 
     ["PROJECT_CONCEPTUALIZATION","project Conceptualization"],
 
     ["IT_DIGITAL_MEDIA_MARKETING","IT Digital Media Marketing"],
 
     ["DATABASE_MANAGEMENT","Database Management"],
 
     ["SAFTEY_MANAGEMENT","Safety Management"],
 
     ["FACILITY_MANAGEMENT","Facility Management"],
 
     ["MANPOWER_SOURCING_MANAGEMENT","Manpower Sourcing Management"],
 
     ["MATERIAL_SOURCING_MANAGEMENT","Material Sourcing Management"],
 
     ["BLOCKCHAIN_TRAINER","Blockchain Trainer"],
 
     ["DIGITAL_MARKETING_TRAINER","Digital Marketing Trainer"],
 
     ["REAL_ESTATE_TARINER","Real Estate Trainer"],
 
     ["SALES_MARKETING_TRAINER","Sales Marketing Trainer"],
 
     ["DRAFTING","Drafting"],
 
     ["INTERIOR_AND_EXTERIOR_DESIGN","Interior and Exterior Trainer"],
 
     ["LAND_SURVEY","Land Survey"],
 
     ["PROJECT_QUALITY_ASSESSMENT_CONSULTING","Project Quality Assessment Consulting"],
 
     ["PROJECT_SELF_SUSTAINABILITY_CONSULTING","Project Self Sustainability Consulting"],
 
     ["MATERIAL_SUPPLIER","Material Supplier"],

     ["JOINT_VENTURE","Join Venture"],

     ["OFFICE_BUILDING","Office Building"],
     
     ["OFFICE_FLOOR","Office Floor"],

     ["COMPLEX","Complex"],

     ["SHOPS","Shops"],

     ["SPECIAL_ECONOMIC_ZONE","Special Economic Zone"],

     ["RESORT","Resort"],

     ["HOTELS","Hotels"],

     ["FLAT","Flat"],

     ["HOUSE","House"],

     ["VILLA","Villa"],

     ["BUNGLOW","Bunglow"],
     ["DUPLEX","Duplex"],
     ["FACTORY","Factory"],
     ["ASSEMBLING_UNIT","Assembling Unit"],
     ["WORKSHOP","Workshop"],
     ["WAREHOUSE","WareHouse"],
     ["LABORATORY","Laboratory"],
     ["COLD_STORAGE","Cold Storage"],
     ["FARM_LAND","Farm Land"],
     ["GREEN_HOUSE","Green House"],
     ["FARM_HOUSE","Farm House"],
     ["POLUTARY_LAND","Poultry Land"],
  ]);
}