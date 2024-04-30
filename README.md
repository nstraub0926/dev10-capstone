# Capstone Proposal

## 1. Problem Statement

> Modern day club management systems are widely utilized by a variety of organizations; however, these systems generally only tackle a succinct and uniform list of requirements (as described by the needs of the type of club they are addressing). Rather than resorting to applications that only apply to a select grouping of organizations, **CLUB** will tackle and provide a robust set of features that can be used across a varietal of clubs (granting members access to events and bookings for multiple organizations, all housed within one application).
> 
> CLUB's comprehensive management system will be required to streamline and enhance the administrative operations of a diverse range of clubs, including social clubs, sports clubs, hobby clubs, and more.
>
> The current manual processes for membership management, event scheduling, communication, and financial tracking are inefficient, leading to inconsistencies, errors, and delays.
>
> There is a pressing need for a digital solution that can automate these tasks, improve member engagement, simplify administrative workflows, and provide real-time insights for better decision-making. The system should be user-friendly, scalable, customizable to different club needs, and capable of integrating with existing systems for seamless data exchange.

## 2. Technical Solution

> Create an application to manage adminstrative workflow for clubs of all forms and use case requirements.
> 
> ### Scenario 1
> A night club is looking to persue a new management avenue, as theirs is moderately unorganized and housed on different sites. This club is interested in promoting it's upcoming events and wishes to know more about how many people are intending on going to each event. This club also has rentable venues & product services that they wish to sell and book out to their constituents. This club will require their members to have tiers of membership in order to access exclusive offers, private events, and deals on reservations. 
> 
> ### Scenario 2
> A book club is gaining a decent amount of hype and popularity amongst joining members, and the club's meetings are beginning to become scrambled and mismanaged. The book club owner is interested in using our application to solidify discrete times, locations, and lists of attendees for future club meetings. The owner wants users to be able to reserve books for upcoming meetings and needs a platform to check these books out accordingly.
>
> ### Scenario 3
> A fitness club rents out a space where users can enjoy perks such as training classes and facility bookings. Members pay for different tiers of membership, which will define how many events they can book and which facilities they can use. The application will moderate how many members can use the club's services and will prevent classes/facilities from getting overbooked. Fitness club admins can moderate when classes need to be canceled, facilities updated, and can intervene on membership status.

## 3. Glossary

> ### Club
> ### Club Member
> ### Club Admin
> ### Club Event
> ### Club Booking
> ### Member Profile
> ### Member Management

## 4. High Level Requirement

> - Member signup (authenticated).
> - Member login (authnticated).
> - Browse for Clubs to join (MEMBER).
> - View member profile (MEMBER).
> - View all RSVP'd events (MEMBER).
> - View all bookings (MEMBER).
> - CRUD for club members (ADMIN).
> 
> - RSVP to an event (MEMBER).
> - Create an event (ADMIN).
> - Edit an event (ADMIN).
> - Cancel an event (ADMIN).
>
> - Book a utility (MEMBER).
> - Create a booking (ADMIN).
> - Update a booking (ADMIN).
> - Delete a booking (ADMIN).

## 5. User Stories/Scenarios

> ### Member signup (authenticated)
> New users will be directed to the signup page upon accessing the site. They will be asked to create an account and signup using an email and password.
> ### Member login (authnticated)
> For returning users, they will be directed to the login page. They will be asked for their email and password to login to the site.
> ### Browse for Clubs to join (MEMBER)
> A user is brand new to the application and is looking for clubs to join. This view will have a list of available clubs to join and will link said member to the club, giving them access to all events and bookings for that particular club.
> ### View/update member profile (MEMBER)
> A member will be able to view and update their member profile with information pertaining to their name, phone number, email, address, membership type, membership status, join date, expiration date, as well as a list of clubs they are currently a part of.
> ### View all RSVP'd events (MEMBER)
> A list of all RSVP'd events will populate in the member's profile, giving them access to event details 
> ### View all bookings (MEMBER)
> A list of all facility/utility bookings will populate in the member's profile, giving them access to booking details
> ### CRUD for club members (ADMIN)
> Admin will be able to manage all club members, giving them the ability to view all current club members, add new members to their organization, update membership status, as well as remove members from their listings.
>
> ### RSVP to an event (MEMBER)
> Once a member is granted club access, they will be able to access a card grid listing of all events being held by their joined organizations. Every event will have an RSVP button which will add this card to their own user profile.
> ### Create an event (ADMIN)
> Club admins will be able to create and post new events under their club page, giving all club members access to this information.
> ### Edit an event (ADMIN)
> Club admins can update event fields, if changes needed to be made to the date, time, location, etc.
> ### Cancel an event (ADMIN)
> In the case of event cancelation, club admins will be able to remove an event posting from their club such that the event is unaccessible from club member views.
>
> ### Book a utility (MEMBER)
> A calendar service will be implemented on this page, where club members will have access to all bookable facilities/utilities (within the wheelhouse of clubs they have joined). These booked services will populate in their profile page for ease of use.
> ### Create a booking (ADMIN)
> A club admin will be able to create a booking for a good or service that their club offers. This will populate as a calendar event for their members to view and book.
> ### Update a booking (ADMIN)
> If a booking field needs to be updated, these changes will be made to the backend, such that club members will always see the most updated version of the booking at hand.
> ### Delete a booking (ADMIN)
> If a booking is not longer available for use, the club admin can remove said booking from the calendar and club members will no longer have the ability to checkout that good or service. This will also update previously made bookings.
