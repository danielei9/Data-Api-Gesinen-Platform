# Apuntes 

## Flujo  Outside-In Crear funcionalidad

Hacer funcionalidades desde el punto mas cercano al usuario final o quien va a consumir esta funcionalidad.

Definir funcionalidad desde el punto de vista de como nuestro cliente lo va consumir.

    1º escribir test de la feature: Create new course

        tests/apps/mooc/backend/features/courses/create-course.feature

        Feature: "name"
        In "Descripción"

        Scenario: Se envia un curso no existente mediante un put

        """ body """

    Then status code response should be 201
    And the response should be empty

Implementar controlador.