

type Res = (
  {
    ok: true
  }
  | 
  {
    ok: false
    error: string
  }
)

type ResData<D> = (
  {
    ok: true
    data: D
  }
  | 
  {
    ok: false
    error: string
  }
)


/* API */


type Breed = (
  | "Affenpinscher"
  | "Afghan Hound"
  | "African Hunting Dog"
  | "Airedale"
  | "American Staffordshire Terrier"
  | "Appenzeller"
  | "Australian Terrier"
  | "Basenji"
  | "Basset"
  | "Beagle"
  | "Bedlington Terrier"
  | "Bernese Mountain Dog"
  | "Black-and-tan Coonhound"
  | "Blenheim Spaniel"
  | "Bloodhound"
  | "Bluetick"
  | "Border Collie"
  | "Border Terrier"
  | "Borzoi"
  | "Boston Bull"
  | "Bouvier Des Flandres"
  | "Boxer"
  | "Brabancon Griffon"
  | "Briard"
  | "Brittany Spaniel"
  | "Bull Mastiff"
  | "Cairn"
  | "Cardigan"
  | "Chesapeake Bay Retriever"
  | "Chihuahua"
  | "Chow"
  | "Clumber"
  | "Cocker Spaniel"
  | "Collie"
  | "Curly-coated Retriever"
  | "Dandie Dinmont"
  | "Dhole"
  | "Dingo"
  | "Doberman"
  | "English Foxhound"
  | "English Setter"
  | "English Springer"
  | "EntleBucher"
  | "Eskimo Dog"
  | "Flat-coated Retriever"
  | "French Bulldog"
  | "German Shepherd"
  | "German Short-haired Pointer"
  | "Giant Schnauzer"
  | "Golden Retriever"
  | "Gordon Setter"
  | "Great Dane"
  | "Great Pyrenees"
  | "Greater Swiss Mountain Dog"
  | "Groenendael"
  | "Ibizan Hound"
  | "Irish Setter"
  | "Irish Terrier"
  | "Irish Water Spaniel"
  | "Irish Wolfhound"
  | "Italian Greyhound"
  | "Japanese Spaniel"
  | "Keeshond"
  | "Kelpie"
  | "Kerry Blue Terrier"
  | "Komondor"
  | "Kuvasz"
  | "Labrador Retriever"
  | "Lakeland Terrier"
  | "Leonberg"
  | "Lhasa"
  | "Malamute"
  | "Malinois"
  | "Maltese Dog"
  | "Mexican Hairless"
  | "Miniature Pinscher"
  | "Miniature Poodle"
  | "Miniature Schnauzer"
  | "Newfoundland"
  | "Norfolk Terrier"
  | "Norwegian Elkhound"
  | "Norwich Terrier"
  | "Old English Sheepdog"
  | "Otterhound"
  | "Papillon"
  | "Pekinese"
  | "Pembroke"
  | "Pomeranian"
  | "Pug"
  | "Redbone"
  | "Rhodesian Ridgeback"
  | "Rottweiler"
  | "Saint Bernard"
  | "Saluki"
  | "Samoyed"
  | "Schipperke"
  | "Scotch Terrier"
  | "Scottish Deerhound"
  | "Sealyham Terrier"
  | "Shetland Sheepdog"
  | "Shih-Tzu"
  | "Siberian Husky"
  | "Silky Terrier"
  | "Soft-coated Wheaten Terrier"
  | "Staffordshire Bullterrier"
  | "Standard Poodle"
  | "Standard Schnauzer"
  | "Sussex Spaniel"
  | "Tibetan Mastiff"
  | "Tibetan Terrier"
  | "Toy Poodle"
  | "Toy Terrier"
  | "Vizsla"
  | "Walker Hound"
  | "Weimaraner"
  | "Welsh Springer Spaniel"
  | "West Highland White Terrier"
  | "Whippet"
  | "Wire-haired Fox Terrier"
  | "Yorkshire Terrier"
)

type Sort = `${keyof Dog}:${"asc"|"desc"}`


interface User {
  name: string
  email: string

}

interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: Breed
}

interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface Match {
  match: string
}

interface SearchParams {
  /**
   * an array of breeds
   * */
  breeds?: Breed[]
  /**
   * an array of zip codes
   * */
  zipCodes?: string[]
  /**
   * a minimum age
   * */
  ageMin?: number
  /**
   * a maximum age
   * */
  ageMax?: number

  /**
   * the number of results to return; defaults to 25 if omitted
   * */
  size?: number
  /**
   * a cursor to be used when paginating results (optional)
   * */
  from?: number
  /**
   * the field by which to sort results, and the direction of the sort; in the format sort=field:[asc|desc]
   * */
  sort?: Sort
}

interface SearchResult {
  /**
   * an array of dog IDs matching your query
   * */
  resultIds: string[]

  /**
   * the total number of results for the query 
   * (not just the current page)
   * */
  total: number

  /**
   * a query to request the next page of results (if one exists)
   * */
  next?: string

  /**
   * a query to request the previous page of results (if one exists)
   * */
  prev?: string
}

interface LocationParams {
  /**
   * the full or partial name of a city
   * */
  city?: string,
  /**
   * an array of two-letter state/territory abbreviations
   * */
  states?: string[],
  /**
   * an object defining a geographic bounding box:
   * */
  geoBoundingBox?: {
    top?: Coordinates,
    left?: Coordinates,
    bottom?: Coordinates,
    right?: Coordinates,
    bottom_left?: Coordinates,
    top_left?: Coordinates
  },
  /**
   * The number of results to return; defaults to 25 if omitted
   * */
  size?: number,
  /**
   * A cursor to be used when paginating results (optional)
   * */
  from?: number
}

interface LocationResult {
  results: Location[],
  /**
   * the total number of results for the query (not just the current page)
   * */
  total: number
}