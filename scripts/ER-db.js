erDiagram
    USERS {
        string userId
        object coordinates "latitude, longitude"
        datetime createdAt
        string documentNumber
        string documentType
        string email
        string field
        string firstName
        string lastName
        string nearestLocation
        string phoneNumber
        string professionalLicense
        string role
        string specialty
        string type
        string uid
}
    SERVICES {
        string serviceId
        string name
        string description
        float price
        string expertId
        string location
        string category
        string subcategory
        string specialtyId
        string subcategory
        string rating
        datetime createdAt
}
    LOCATIONS {
        string locationId
        float latitude
        float longitude
        string name
}
    CATEGORIES {
        string categoryId
        string name
        string description
        array  subcategories
}
    SPECIALTIES {
        string specialtyId
        string field
        string description
        array subcategories
}
    MATCHES {
        string matchId
        string clientId
        string expertId
        string serviceId
        string status
        datetime createdAt
}

USERS || --o{
    SERVICES: "Requiere (expertId)"
    USERS || --o{
        MATCHES: "Partticipa(clientId, expertId)"
        SERVICES || --o | LOCATIONS : "Contiene la comuna (location)"
        SERVICES || --o | CATEGORIES : "Estatico (category)"
        SERVICES || --o | SPECIALTIES : "Estatico (subcategory)"
