const discountCheckbox = document.getElementById("discountCheckbox");
const discountContainer = document.getElementById("discountContainer");

const modifierOptionsData = [
  { label: "Accessory-Before-the-Fact", percent: -75 },
  { label: "Accessory-After-the-Fact", percent: -25 },
  { label: "Aiding and Abetting", percent: 0 },
  { label: "Applicability", percent: 0 },
  { label: "Attempt", percent: 0 },
  { label: "Conspiracy", percent: 0 },
  { label: "Soliciting", percent: -50 },
  { label: "Gang Enhancement", percent: +50 },
  { label: "Protected Persons", percent: +40 },
  { label: "Public Menace (Add 600 months)", percent: 0 },
  { label: "Intent to Sell", percent: +50 },
  { label: "Protected Property", percent: +20 },
];

const modifierOptionsContainer = document.getElementById("modifierOptionsContainer");
const modifierOptionsDiv = document.getElementById("modifierOptions");

let selectedItemIndex = null; // track which item is selected for modifier

// Customizable items: each has a name, two number values (val1, val2), and a description
const items = [
  { name: "P.C. 201 Criminal Threat (Misdemeanor)", val1: 300, val2: 10, description: "Intentionally puts another in the belief of physical harm or offensive contact." },
  { name: "P.C. 202 Assault and Battery (Felony)", val1: 800, val2: 20, description: "Uses violence to cause physical harm to another person without a weapon." },
  { name: "P.C. 203 Second Degree Aggravated Assault and Battery (Felony)", val1: 1000, val2: 40, description: "A spontaneous act of violence using a deadly weapon or dangerous object to cause physical harm to another person, without premeditation or intent to kill." },
  { name: "P.C. 204 First Degree Aggravated Assault and Battery (Felony)", val1: 1500, val2: 60, description: "A premeditated and deliberate attack on another person with the intent to cause serious harm or death, where the actions go beyond aggravated assault but do not result in a completed killing." },
  { name: "P.C. 205 Torture (Felony)", val1: 1200, val2: 70, description: "Causes extreme pain and suffering to another person." },
  { name: "P.C. 206 Maiming (Felony)", val1: 4000, val2: 350, description: "The act of disabling, disfiguring, removing or permanently damaging a person's limbs (all extremities) either intentionally or in a fight." },
  { name: "P.C. 207 Terroristic Threat (Felony)", val1: 1000, val2: 30, description: "Intentionally puts another in the belief or fear of an act of terrorism happening." },
  { name: "P.C. 208 Terrorism (Felony) HUT", val1: null, val2: null, description: "A violent, criminal act committed by a person to further goals stemming from political, religious, social, or environmental influences." },
  { name: "P.C. 209 Involuntary Manslaughter (Felony) HUT", val1: null, val2: null, description: "Acted recklessly and negligently which resulted in the death of another person." },
  { name: "P.C. 210 Voluntary Manslaughter (Felony) HUT", val1: null, val2: null, description: "Acted in the heat of passion caused by being reasonably and strongly provoked which resulted in the death of another person." },
  { name: "P.C. 211 Second Degree Murder (Felony) HUT", val1: null, val2: null, description: "The unlawful killing of another person without prior planning, occurring as a result of reckless or intentional violence where death was a foreseeable consequence." },
  { name: "P.C. 212 First Degree Murder (Felony) HUT", val1: null, val2: null, description: "The intentional and premeditated killing of another person, carried out with malice and a clear, deliberate intent to cause death." },
  { name: "P.C. 213 False Imprisonment (Misdemeanor)", val1: 600, val2: 10, description: "A person who intentionally and unlawfully restrains, detains, or confines another person." },
  { name: "P.C. 214 Kidnapping (Felony)", val1: 1000, val2: 50, description: "Intentionally took another person from point A to point B without consent." },
  { name: "P.C. 215 Destructive Use of Blasting Agents (Felony)", val1: 2500, val2: 85, description: "Intentionally using an incendiary/explosive device to cause harm to another person." },

  { name: "P.C. 301 Loitering (Misdemeanor)", val1: 250, val2: 10, description: "Fails to leave property when asked to do so by a relevant representative of the property." },
  { name: "P.C. 302 Trespassing (Misdemeanor)", val1: 300, val2: 10, description: "Enters, or remains on land and fails to leave after being ordered to leave or which noted that entry was forbidden." },
  { name: "P.C. 303 Burglary (Felony)", val1: 600, val2: 25, description: "The act of entering property with the intent to commit a crime. For vehicles specifically, this is known as Auto-Burglary." },
  { name: "P.C. 304 Robbery (Felony)", val1: 400, val2: 25, description: "The unlawful taking of property from the person of another through the use of threat or force." },
  { name: "P.C. 305 Armed Robbery (Felony)", val1: 850, val2: 40, description: "The unlawful taking of property from the person of another by the use of a weapon." },
  { name: "P.C. 306 Robbery of a Shop (Felony)", val1: 1000, val2: 40, description: "The unlawful taking of property within a store." },
  { name: "P.C. 307 Robbery of a Bank (Felony)", val1: 2500, val2: 80, description: "The unlawful taking of property within a bank." },
  { name: "P.C. 308 Robbery of a Stockade (Felony)", val1: 3000, val2: 110, description: "The unlawful taking of property within a Stockade or armored vehicle." },
  { name: "P.C. 309 Robbery of a Jewellery Store (Felony)", val1: 3500, val2: 140, description: "The unlawful taking of property within a Jewellery Store." },
  { name: "P.C. 310 Theft (Misdemeanor)", val1: 200, val2: 10, description: "Takes personal property of another without permission or consent." },
  { name: "P.C. 311 Grand Theft (Felony)", val1: 1000, val2: 15, description: "Taking the property of another illegally with the intent to deprive the owner of that property. Value exceeding $3000." },
  { name: "P.C. 312 Grand Theft Auto (Felony)", val1: 1000, val2: 30, description: "Taking the vehicle of another illegally with the intent to deprive the owner of that vehicle." },
  { name: "P.C. 313 Destruction of Private Property (Misdemeanor)", val1: 350, val2: 10, description: "Willful destruction or damaging of property in a manner that defaces, mars, or otherwise adds a physical blemish." },
  { name: "P.C. 314 Possession of Stolen Property (Misdemeanor)", val1: 350, val2: 10, description: "Has possession of property not belonging to them and the owner has reported said items stolen." },
  { name: "P.C. 315 Receiving Stolen Property (Felony)", val1: 400, val2: 25, description: "Individual has accepted possession of goods or property and knew they were stolen." },
  { name: "P.C. 316 Corruption (Felony)", val1: 1100, val2: 55, description: "Improper and unlawful conduct by abusing one's position of power in a way intended to secure a benefit for oneself or another." },
  { name: "P.C. 317 Fraud (Felony)", val1: 450, val2: 20, description: "The deliberate misrepresentation of fact for the purpose of depriving someone of a valuable possession." },
  { name: "P.C. 318 Forgery (Felony)", val1: 600, val2: 30, description: "Making and/or possession of a false writing with an intent to defraud." },
  { name: "P.C. 319 Vandalism (Misdemeanor)", val1: 300, val2: 10, description: "The willful or malicious destruction or defacement of property with malicious intent." },
  { name: "P.C. 320 Arson (Felony)", val1: 600, val2: 20, description: "Starts a fire or causes an explosion with the intent to cause damage after ignition." },
  { name: "P.C. 321 Animal Abuse (Felony)", val1: 600, val2: 20, description: "The act of intentionally harming dogs, cats, and birds (does not include wild animals)." },
  { name: "P.C. 322 Animal Negligence (Felony)", val1: 700, val2: 20, description: "The act of intentionally putting an animal in a situation of danger that could possibly harm the animal (does not include wild animals)." },
  { name: "P.C. 323 Hunting Without a License (Felony)", val1: 1500, val2: 50, description: "The act of operating a weapon designated for hunting without a proper license." },
  { name: "P.C. 324 Possession of Contraband (Misdemeanor)", val1: 150, val2: 10, description: "Has possession of 1-10 red, blue, or green decryption keys, 1-10 chips, 1-10 raspberry chips, 1-10 fake plates, 1-10 meth tables, 1-10 catalytic converters or 1-10 pagers." },
  { name: "P.C. 325 Trafficking of Contraband (Felony)", val1: 400, val2: 30, description: "Possession of 11 or more red, blue, or green decryption keys, 11 or more chips, 11 or more raspberry chips, 11 or more fake plates, 11 or more meth tables, 11 or more catalytic converters, or 11 or more pagers." },
  { name: "P.C. 326 Possession of Contraband in Crime (Felony)", val1: 200, val2: 15, description: "Possession of 1-10 thermite, lockpicks, tuner chips, fake plates, boosting tablets, meth table, acetone, lithium batteries, sawzalls, or pagers, and using them to aid in a crime specific to the contraband." },
  { name: "P.C. 327 Trafficking of Contraband in Crime (Felony)", val1: 3000, val2: 220, description: "Possession of 11 or more thermite, lockpicks, tuner chips, fake plates, boosting tablets, meth tables, acetone, lithium batteries, sawzalls, or pagers, and using them to aid in a crime specific to the contraband." },
  { name: "P.C. 328 Breaching Company Regulations (Misdemeanor)", val1: 4000, val2: 10, description: "Intentionally disregarding or breaching any of the official company regulations set by the government." },
  { name: "P.C. 329 Damaging a Communication Device (Misdemeanor)", val1: 600, val2: 40, description: "Removing, destroying, or obstructing the use of any wireless communication device with the intent to prevent help or emergency communication." },
 
  { name: "P.C. 401 Disorderly Conduct (Misdemeanor)", val1: 400, val2: 10, description: "A person who intentionally disturbs the public peace and order by language or other conduct." },
 
  { name: "P.C. 501 Bribery (Felony)", val1: 500, val2: 25, description: "The act of promising to or exchanging property with the corrupt aim of influencing a public official in the discharge of their official duties." },
  { name: "P.C. 502 Disregarding a Lawful Command (Misdemeanor)", val1: 300, val2: 10, description: "The act of ignoring or disregarding a command given by a peace officer to achieve a reasonable and lawful goal." },
  { name: "P.C. 503 Impersonation of a Public Servant (Felony)", val1: 500, val2: 20, description: "The false representation by one person that they are another or that they occupy the position of a public servant." },
  { name: "P.C. 504 Impersonation of a Peace Officer (Felony)", val1: 900, val2: 30, description: "The false representation by one person that they are another or that they occupy the position of a peace officer." },
  { name: "P.C. 505 Obstruction of Justice (Misdemeanor)", val1: 450, val2: 10, description: "An act that 'corruptly or by threats or force, or by any threatening letter or communication obstructs the due administration of justice.'" },
  { name: "P.C. 506 Resisting a Peace Officer (Misdemeanor)", val1: 600, val2: 20, description: "A person who avoids or resists apprehension by a peace officer." },
  { name: "P.C. 507 Felony Resisting a Peace Officer (Felony)", val1: 1000, val2: 30, description: "A person who resists apprehension with an attempt or threat to use physical violence against a peace officer." },
  { name: "P.C. 508 Misuse of a Mobile Hotline (Misdemeanor)", val1: 500, val2: 5, description: "A person who intentionally uses the Government, Police, or EMS Hotline for reasons other than emergency purposes." },
  { name: "P.C. 509 Tampering with Evidence (Felony)", val1: 2000, val2: 50, description: "Altering evidence in any form with intent to mislead a public servant during an investigation or legal proceeding." },
  { name: "P.C. 510 Unlawful Arrest (Felony)", val1: 750, val2: 35, description: "The intentional detention of a person without probable cause, a valid arrest warrant, or consent." },
  { name: "P.C. 511 Contempt of Court (Misdemeanor)", val1: 500, val2: 20, description: "Any form of disturbance or behavior that impedes the functioning of the court, with possible increased punishment based on severity." },
  { name: "P.C. 512 Breach of Contract (Misdemeanor)", val1: 1000, val2: 10, description: "Failing to adhere to the terms and obligations of a legally binding contract." },
  { name: "P.C. 513 Violation of a Court Order (Felony)", val1: 1400, val2: 40, description: "Any form of violation of a legally binding court order issued by a judge." },
  { name: "P.C. 514 Wearing a Disguise to Evade Police (Misdemeanor)", val1: 800, val2: 0, description: "Wearing a disguise or mask to avoid identification during the commission of a crime or when evading arrest." },
  { name: "P.C. 515 Perjury (Felony)", val1: 1500, val2: 50, description: "Knowingly providing false testimony while under oath, including both written and verbal statements." },
  { name: "P.C. 516 Violating a Protective Order (Felony)", val1: 1500, val2: 50, description: "Any intentional violation of a protective order, which may involve harassment or threatening behavior toward the protected party." },
  { name: "P.C. 517 Prisoner Escaping Custody (Felony)", val1: 1500, val2: 50, description: "An individual escaping from lawful custody while being transported by a peace officer." },
  { name: "P.C. 518 Rescuing a Prisoner (Felony)", val1: 1500, val2: 100, description: "An individual who aids or rescues a prisoner in escape from lawful custody." },
  { name: "P.C. 519 Sightseeing at the Scene of an Emergency (Misdemeanor)", val1: 250, val2: 15, description: "A person who goes to or stops at the scene of an emergency for the purpose of observing the scene or the activities of emergency responders, unless it is part of their employment duties." },

  { name: "P.C. 601 Incitement to Riot (Misdemeanor)", val1: 450, val2: 10, description: "Conduct, words, or other means that urge or naturally lead others to riot, violence, or insurrection." },
  { name: "P.C. 602 Public Intoxication (Misdemeanor)", val1: 300, val2: 5, description: "Being in any area that is not private while under the influence of alcohol and/or drugs." },
  { name: "P.C. 603 Public Endangerment (Felony)", val1: 400, val2: 20, description: "Any person who recklessly engages in conduct which places or may place another person in danger of death or serious bodily injury." },
  { name: "P.C. 604 Verbal Harassment (Misdemeanor)", val1: 300, val2: 10, description: "A person who, with the intent to harass, annoy, or alarm another, uses speech to cause distress." },
  { name: "P.C. 605 Civil Negligence (Misdemeanor)", val1: 400, val2: 10, description: "Conduct that falls below the standard of care which a reasonable person would deem safe, endangering others." },
  { name: "P.C. 606 Criminal Negligence (Felony)", val1: 500, val2: 20, description: "Conduct that falls below a reasonable standard of care, with the intent to harm another person." },

  { name: "P.C. 701 Maintaining a Place for Distribution (Misdemeanor)", val1: 600, val2: 25, description: "Having keys to a property for the purpose of selling, giving away, storing, or using any Class B substance without a sales permit, Class A substance, narcotics, contraband, or illegal weapons." },
  { name: "P.C. 702 Felony Maintaining a Place for Distribution", val1: 1200, val2: 50, description: "Having keys to a property for the purpose of selling, giving away, storing illegal weapons or narcotics." },
  { name: "P.C. 703 Sale of a Controlled Substance (Felony)", val1: 400, val2: 20, description: "The act of offering, selling, transporting, or giving away narcotics, a Class B Substance, or Class A Substance to another person without a sales permit." },
  { name: "P.C. 704 Possession of a Class B Substance (Misdemeanor)", val1: 200, val2: 5, description: "Possession of 11-24 joints without a sales permit, 1-19q of processed or unprocessed weed (4q = 1oz), 1-4 buds of weed, 1-4 acid, or 1-6 lean." },
  { name: "P.C. 705 Drug Trafficking of a Class B Substance (Felony)", val1: 3500, val2: 50, description: "Possession of 25 or more joints without a sales permit, 20q or more of processed or unprocessed weed (4q = 1oz), 5 or more buds of weed, 5 or more acid, or 7 or more lean." },
  { name: "P.C. 706 Possession of a Class A Substance (Felony)", val1: 500, val2: 10, description: "Possession of 1-7 bags of cocaine, 1-7 bags of meth, or 1-4 shrooms." },
  { name: "P.C. 707 Drug Trafficking of a Class A Substance (Felony)", val1: 5000, val2: 70, description: "Possession of 1 or more bricks of cocaine, 8 or more bags of cocaine, 8 or more bags of meth, or 5 or more shrooms." },
  { name: "P.C. 708 Intention to Sell Distilled Spirits (Misdemeanor)", val1: 100, val2: 5, description: "Possession of 3 or more distilled spirits, with the clear intention to sell without a license." },
  { name: "P.C. 709 Possession of Narcotics (Felony)", val1: 400, val2: 10, description: "Possession of 1-10 narcotics without a prescription from a licensed doctor currently working with or for the EMS." },
  { name: "P.C. 710 Drug Trafficking of Narcotics (Felony)", val1: 4500, val2: 70, description: "Possession of 11 or more narcotics without a prescription from a licensed doctor currently working with or for the EMS." },
  { name: "P.C. 711 Manufacturing Controlled Substances (Felony)", val1: 1000, val2: 35, description: "The manufacturing, producing, or importing of any Narcotics or Class A or B substances without a sales permit." },
  { name: "P.C. 712 Mining Without a License (Misdemeanor)", val1: 1000, val2: 20, description: "The activity of extracting gemstones or minerals from the ground without a mining license." },
  { name: "P.C. 713 Mining Without a Scanner (Misdemeanor)", val1: 500, val2: 15, description: "The activity of extracting gemstones or minerals from the ground without a gemstone scanner, considered civil negligence." },

  { name: "P.C. 801 Driving Without a License (Misdemeanor)", val1: 300, val2: 0, description: "Operating a motor vehicle without proper identification or a valid driver's license." },
  { name: "P.C. 802 Driving With a Suspended License (Misdemeanor)", val1: 400, val2: 10, description: "Operating a motor vehicle while your driver's license is suspended or revoked." },
  { name: "P.C. 803 Hit and Run (Felony)", val1: 750, val2: 25, description: "Leaving the scene of an accident without providing identification, and failing to render assistance when you are at fault in a vehicular accident." },
  { name: "P.C. 804 Speeding (Misdemeanor)", val1: 300, val2: 0, description: "Driving a motor vehicle at a speed that exceeds the legal speed limit, or driving in an unreasonable manner based on traffic, weather, or road conditions." },
  { name: "P.C. 805 Excessive Speeding (Felony)", val1: 600, val2: 30, description: "Driving 30+ mph over the speed limit or operating a vehicle in a manner that endangers public safety." },
  { name: "P.C. 806 Reckless Driving (Misdemeanor)", val1: 600, val2: 20, description: "Operating a motor vehicle in a manner that disregards public safety or the safety of other drivers, pedestrians, or property." },
  { name: "P.C. 807 Traffic Violation (Misdemeanor)", val1: 200, val2: 0, description: "Any operation of a motor vehicle that violates traffic laws or regulations." },
  { name: "P.C. 808 Parking Violation (Misdemeanor)", val1: 200, val2: 0, description: "Parking a vehicle in a prohibited area, or any space not designated for public parking." },
  { name: "P.C. 809 Evading a Peace Officer (Misdemeanor)", val1: 350, val2: 15, description: "Refusing to stop or attempting to elude a peace officer after being given a visual or auditory signal to pull over." },
  { name: "P.C. 810 Felony Evading a Peace Officer (Felony)", val1: 700, val2: 30, description: "Fleeing or attempting to evade a peace officer's signal to stop, leading to a dangerous situation." },
  { name: "P.C. 811 Driving Under the Influence (DUI) (Felony)", val1: 400, val2: 10, description: "Operating a motor vehicle while under the influence of alcohol or drugs, impairing your ability to drive." },
  { name: "P.C. 812 Jaywalking (Misdemeanor)", val1: 50, val2: 0, description: "Crossing a multi-lane highway or interstate without using the designated pedestrian crosswalk." },
  { name: "P.C. 813 Joyriding (Misdemeanor)", val1: 350, val2: 10, description: "Driving a motor vehicle without the owner's consent, where the vehicle is not stolen but simply used without authorization." },
  { name: "P.C. 814 Unauthorized Operations of an Aircraft (Felony)", val1: 1500, val2: 20, description: "Operating an aircraft without the proper pilot license or certification required for the aircraft in question." },
  { name: "P.C. 815 Reckless Operations of an Aircraft (Felony)", val1: 2500, val2: 25, description: "Operating an aircraft in a dangerous manner that disregards public safety and endangers the lives of others." },
  { name: "P.C. 816 Improper Operations of an Aircraft (Misdemeanor)", val1: 500, val2: 10, description: "Operating an aircraft improperly by violating aviation standard operating procedures (SOPs), such as failing to use the correct radio channel or having the proper flight tools." },
  { name: "P.C. 817 Tampering with a Motor Vehicle (Misdemeanor)", val1: 750, val2: 15, description: "Tampering with, damaging, or removing parts of a vehicle or its contents without the consent of the owner." },
  { name: "P.C. 818 Engaging in a Speed Contest (Misdemeanor)", val1: 300, val2: 15, description: "Participating in an illegal high-speed race or contest with another vehicle or vehicles on public roads." },

  { name: "P.C. 901 Carrying a Firearm Without a License (Felony)", val1: 400, val2: 25, description: "Carrying and/or concealing a firearm without the proper identification or documentation required by law." },
  { name: "P.C. 902 Brandishing a Weapon (Misdemeanor)", val1: 350, val2: 20, description: "Openly displaying a weapon or replica in a manner intended to create fear or intimidate others." },
  { name: "P.C. 903 Weapons Discharge Violation (Misdemeanor)", val1: 200, val2: 10, description: "Discharging a firearm within city limits or on government property without a lawful reason." },
  { name: "P.C. 904 Felony Weapons Discharge Violation (Felony)", val1: 400, val2: 20, description: "Discharging a firearm without justification, endangering public safety." },
  { name: "P.C. 905 Display of Tactical Gear (Misdemeanor)", val1: 200, val2: 5, description: "Wearing tactical gear such as vests or holsters in plain sight of the public and refusing to remove it when requested." },
  { name: "P.C. 906 Possession of Unregistered Firearm (Felony)", val1: 500, val2: 10, description: "Possessing a firearm that lacks a valid serial number or registration." },
  { name: "P.C. 907 Possession of Class 2 Weapon (Felony)", val1: 1000, val2: 30, description: "Carrying or concealing a Class 2 weapon, which includes certain high-powered firearms or military-grade weapons. \nClass 2 Weapons are Single Fire Pistols not manufactured by Ammu-Nation, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 908 Possession of Class 3 Weapon (Felony)", val1: 2000, val2: 40, description: "Carrying or concealing a Class 3 weapon, such as automatic firearms or other prohibited weaponry. \nClass 3 Weapons are Automatic Pistols, Submachine Guns, Shotguns, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 909 Possession of Class 4 Weapon (Felony)", val1: 3000, val2: 50, description: "Possessing or concealing a Class 4 weapon, including advanced military or armored weapons. \nClass 4 Weapons are Assault Rifles, Sniper Rifles, Muskets, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 910 Possession of Class 5 Weapon (Felony)", val1: 4500, val2: 60, description: "Carrying or concealing a Class 5 weapon, which includes the most dangerous and powerful weapons under the law. \nClass 5 Weapons are Incendiary, and/or explosive devices, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 911 Trafficking of Class 2 Weapon (Felony)", val1: 5000, val2: 150, description: "Trafficking or possessing three or more Class 2 weapons with the intent to distribute or sell them illegally. \nClass 2 Weapons are Single Fire Pistols not manufactured by Ammu-Nation, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 912 Trafficking of Class 3 Weapon (Felony)", val1: 8000, val2: 200, description: "Trafficking or possessing three or more Class 3 weapons, which are often restricted to law enforcement or military use. \nClass 3 Weapons are Automatic Pistols, Submachine Guns, Shotguns, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 913 Trafficking of Class 4 Weapon (Felony)", val1: 11000, val2: 250, description: "Trafficking or possessing three or more Class 4 weapons, typically used in organized crime or armed conflict. \nClass 4 Weapons are Assault Rifles, Sniper Rifles, Muskets, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 914 Trafficking of Class 5 Weapon (Felony)", val1: 17000, val2: 275, description: "Trafficking or possessing three or more Class 5 weapons, including nuclear, chemical, or otherwise highly dangerous arms. \nClass 5 Weapons are Incendiary, and/or explosive devices, including replicas. Full list of weaponry included is listed in the weaponry database." },
  { name: "P.C. 911 Possession of Extended Magazines (Misdemeanor)", val1: 500, val2: 10, description: "Possessing any large-capacity magazine, including one attached to a firearm. This does not apply to peace officers on duty." },
  { name: "P.C. 912 Possession of Silencers (Felony)", val1: 1500, val2: 30, description: "Possessing a silencer or suppressor for a firearm, including when attached to the weapon. This does not apply to authorized peace officers." },
  { name: "P.C. 1001 Racketeering (Felony)", val1: null, val2: null, description: "A pattern of committing Criminal Profiteering crimes, which may include Money Laundering, Trafficking, and Murder charges." },
  { name: "P.C. 1002 Gaming (Misdemeanor)", val1: 200, val2: 5, description: "Dealing, playing, or betting at, or against, any card, banking, or percentage game with dice, cards, or any device for money, credits or other representative of value, outside of a state approved card-room or Diamond Casino." },

];

// DOM Elements
const searchInput = document.getElementById("searchInput");
const itemList = document.getElementById("itemList");
const addedItemsDiv = document.getElementById("addedItems");
const totalsDiv = document.getElementById("totals");
const descriptionContent = document.getElementById("descriptionContent");

// Track added items
let addedItems = [];
// Track selected item for description
let selectedItem = null;

function updateTotals() {
  let totalVal1 = addedItems.reduce((acc, i) => acc + i.val1 * i.count, 0);
  let totalVal2 = addedItems.reduce((acc, i) => acc + i.val2 * i.count, 0);

  if (discountCheckbox.checked) {
    totalVal2 = Math.round(totalVal2 * 0.8);
    totalsDiv.textContent = `Total: $${totalVal1} | ${totalVal2} Months (20% off)`;
  } else {
    totalsDiv.textContent = `Total: $${totalVal1} | ${totalVal2} Months`;
  }
}
// Render the filtered item list
function renderItemList(filter = "") {
  itemList.innerHTML = "";
  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    itemList.innerHTML = "<i>No items found</i>";
    return;
  }

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <span class="item-name">${item.name}</span>
	<span class="values">$${item.val1 * (item.count || 1)} | ${item.val2 * (item.count || 1)} Months</span>
    `;

    // Click adds the item and sets selected item permanently
    div.addEventListener("click", () => {
      addItem(item);
      setSelectedItem(item);
	  searchInput.value = "";         // ✅ Clear the search input
  	  renderItemList();  
    });

    // On hover, show description temporarily
    div.addEventListener("mouseenter", () => {
      descriptionContent.textContent = item.description || "No description available.";
    });

    // On hover out, revert description to selected item or default
    div.addEventListener("mouseleave", () => {
      if (selectedItem) {
        descriptionContent.textContent = selectedItem.description || "No description available.";
      } else {
        descriptionContent.textContent = "Select or hover over an item to see its description.";
      }
    });

    itemList.appendChild(div);
  });
}

// Set the currently selected item for description panel
function setSelectedItem(item) {
  selectedItem = item;
  if (!item) {
    descriptionContent.textContent = "Select or hover over an item to see its description.";
  } else {
    descriptionContent.textContent = item.description || "No description available.";
  }
}

// Add item to the added items list and update totals
function addItem(item) {
  const existing = addedItems.find(i => i.name === item.name);

  if (existing) {
    existing.count = (existing.count || 1) + 1;
  } else {
    addedItems.push({
      ...item,
      count: 1,
      modifiers: [], // start with no modifiers
      baseVal1: item.val1,
      baseVal2: item.val2,
      val1: item.val1,
      val2: item.val2,
    });
  }

  renderAddedItems();
}

// Remove item from added list by index
function removeItem(index) {
  addedItems.splice(index, 1);
  renderAddedItems();
}

// Render added items and totals
function renderAddedItems() {
  addedItemsDiv.innerHTML = "";

  addedItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "added-item";

	const displayVal1 = item.val1 * item.count;
    const displayVal2 = item.val2 * item.count;
	const itemHeader = document.createElement("div");
    itemHeader.className = "added-item-header";
    // Determine base name and modifier

	let nameWithModifiers = item.name;
	if (item.modifiers && item.modifiers.length > 0) {
  	const modifierText = item.modifiers.map(mod => `(${mod})`).join('');
  	nameWithModifiers = item.name.replace(
    /(Felony|Misdemeanor)\)/,
    (match) => `${match} - ${modifierText}`
  		);
	}

    
	itemHeader.innerHTML = `
  	<span>${item.count > 1 ? item.count + "x " : ""}${nameWithModifiers}</span>
  	<div class="right-group">
    <span class="values">${displayVal1} | ${displayVal2}</span>
    <button class="remove-btn" title="Remove" onclick="removeItem(${index})">×</button>
  	</div>
	`;

	 // Click toggles modifier options
      itemHeader.addEventListener("click", () => {
  	selectedItemIndex = index;
  	showModifierOptionsForSelected(item);
	});

    div.appendChild(itemHeader);
    addedItemsDiv.appendChild(div);
  });
  // Calculate totals
  let totalVal1 = addedItems.reduce((acc, i) => acc + i.val1 * i.count, 0);
  let totalVal2 = addedItems.reduce((acc, i) => acc + i.val2 * i.count, 0);

  // Apply discount if checkbox is checked
  if (discountCheckbox.checked) {
    const discountedVal2 = (totalVal2 * 0.8);
    totalsDiv.textContent = `Total: $${totalVal1} | ${discountedVal2} Months (20% off)`;
  } else {
    totalsDiv.textContent = `Total: $${totalVal1} | ${totalVal2} Months`;
  }

  // Show or hide discount checkbox
	if (addedItems.length > 0) {
  	discountContainer.style.display = "block";
	} else {
  	discountContainer.style.display = "none";
  	discountCheckbox.checked = false; // reset if nothing selected
}

updateTotals();


}

// Event listener for search input
searchInput.addEventListener("input", (e) => {
  renderItemList(e.target.value);
});

discountCheckbox.addEventListener("change", updateTotals);

// Initial render
renderItemList();
setSelectedItem(null);


// Make removeItem globally accessible for inline onclick to work
window.removeItem = removeItem;

function showModifierOptions(container, item, index) {
  const optionsDiv = document.createElement("div");
  optionsDiv.className = "modifier-options";

  modifierOptionsData.forEach(({ label, percent }) => {
    const btn = document.createElement("div");
    btn.className = "modifier-option";
    btn.textContent = `${label} (${percent >= 0 ? "+" : ""}${percent}%)`;

    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent toggling modifier options box

      const factor = 1 + percent / 100;
      item.val1 = Math.round(item.val1 * factor);
      item.val2 = Math.round(item.val2 * factor);

      renderAddedItems(); // refresh list and close options
    });

    optionsDiv.appendChild(btn);
  });

  container.appendChild(optionsDiv);
  
  // Trigger fade-in by adding 'show' class on next tick
  requestAnimationFrame(() => {
    optionsDiv.classList.add("show");
  });
}

function hideModifierOptionsContainer() {
  modifierOptionsContainer.classList.remove("show");
  // Wait for transition duration (300ms) before hiding to allow fade-out
  setTimeout(() => {
    modifierOptionsContainer.style.display = "none";
  }, 600);
}

function showModifierOptionsForSelected(item) {
  modifierOptionsContainer.style.display = "block";
  modifierOptionsDiv.innerHTML = "";
  modifierOptionsContainer.classList.remove("show"); // reset



  modifierOptionsData.forEach(({ label, percent }) => {
    const btn = document.createElement("div");
    btn.className = "modifier-option";
    btn.textContent = `${label} (${percent >= 0 ? "+" : ""}${percent}%)`;

    btn.addEventListener("click", () => {
  	const factor = 1 + percent / 100;
  	item.val1 = Math.round(item.baseVal1 * factor);
  	item.val2 = Math.round(item.baseVal2 * factor);

	// Initialize and update modifiers
	if (!item.modifiers) item.modifiers = [];
	if (!item.modifiers.includes(label)) {
		item.modifiers.push(label);
	}

	renderAddedItems();
	hideModifierOptionsContainer();

	});

    modifierOptionsDiv.appendChild(btn);
  });
  requestAnimationFrame(() => {
    modifierOptionsContainer.classList.add("show");
  });
}

function removeItem(index) {
  if (addedItems[index].count > 1) {
    addedItems[index].count--;
  } else {
    addedItems.splice(index, 1);
  }
  renderAddedItems();
}


const copyButton = document.getElementById("copyButton");

copyButton.addEventListener("click", () => {
  if (addedItems.length === 0) return;

  let output = "Charges\n";

  let totalVal1 = 0;
  let totalVal2 = 0;

  addedItems.forEach(item => {
    const countPrefix = item.count > 1 ? `${item.count}x ` : "";

    let nameWithModifiers = item.name;
    if (item.modifiers && item.modifiers.length > 0) {
      const modifierText = item.modifiers.map(mod => `(${mod})`).join('');
      nameWithModifiers = item.name.replace(
        /(Felony|Misdemeanor)\)/,
        (match) => `${match} - ${modifierText}`
      );
    }

    output += `${countPrefix}${nameWithModifiers}\n`;

    totalVal1 += item.val1 * item.count;
    totalVal2 += item.val2 * item.count;
  });

  const originalVal2 = totalVal2;

  if (discountCheckbox.checked) {
    totalVal2 = Math.round(totalVal2 * 0.8);
    output += `\nTotal: $${totalVal1} | ~~${originalVal2}~~ ${totalVal2} Months (20% off)`;
  } else {
    output += `\nTotal: $${totalVal1} | ${totalVal2} Months`;
  }

  // Copy to clipboard
  navigator.clipboard.writeText(output.trim()).then(() => {
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy Charges to Clipboard";
    }, 2000);
  });
});

