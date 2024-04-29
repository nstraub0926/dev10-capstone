# Capstone Proposal

## 1. Problem Statement

> Modern day club management systems are widely utilized by a variety of organizations; however, these systems generally only tackle a succinct and uniform list of requirements (as described by the needs of the club type they are addressing). Rather than resorting to applications with little to no wiggle room, when it comes to expanding upon growing company needs, **CLUB** will tackle and provide a robust  set of features that can be used by any and all constituents.
> 
> CLUB's comprehensive management system will be required to streamline and enhance the administrative operations of a diverse range of clubs, including social clubs, sports clubs, hobby clubs, and more.
>
> The current manual processes for membership management, event scheduling, communication, and financial tracking are inefficient, leading to inconsistencies, errors, and delays.
>
> There is a pressing need for a digital solution that can automate these tasks, improve member engagement, simplify administrative workflows, and provide real-time insights for better decision-making. The system should be user-friendly, scalable, customizable to different club needs, and capable of integrating with existing systems for seamless data exchange.

## 2. Technical Solution

> Create an application to manage adminstrative workflow for clubs of all forms and requirements.
> 
> ### Scenario 1
> A night club is looking to persue a new management avenue, as theirs is moderately unorganized and housed on different sites. This club is interested in promoting it's upcoming events and wishes to know more about how many people are intending on going to each event. This club also has venue & product services that they wish to rent out to   
> 
> ### Scenario 2
> A book club is gaining a decent amount of hype and popularity amongst joining members, and the club's meetings are beginning to become scrambled and mismanaged. The book club owner is interested in using our application to solidify discrete times, locations, and lists of attendees for future club meetings. The owner wants users to be able to reserve books for upcoming meetings and needs a platform to check these books out accordingly.
>
> ### Scenario 3
> A fitness club rents out a space where users can enjoy perks such as training classes and facility bookings. Members pay for different tiers of membership, which will define how many events they can book and which facilities they can use. The application will moderate how many members can use the club's services and will prevent classes/facilities from getting overbooked. Fitness club admins can moderate when classes need to be canceled, facilities updated, and can intervene on membership status.

## 3. Glossary

> ### Club
> An organization based on a shared love of running. Clubs have members. They host runs. Some are informal with infrequent runs. Others are large, have budgets, and charge membership fees.
> ### Club Member
> A runner who is formally affiliated with a running club. A runner can be a member of more than one club.
> ### Club Admin
> A running club member with an administrator role. They have more privileges in the Group Run application. All admins are members, but not all members are admins.
> ### Club Event
> A running event with a specific time, date, and location. A run may also include a route (stretch goal).
> ### Club Reservation
> ### Member Profile
> ### Member Management

## 4. High Level Requirement

Briefly describe what each user role/authority can do. (These are user stories.)

### Example

> - RSVP to an event (MEMBER).
> - Create an event (ADMIN).
> - Edit an event (ADMIN).
> - Cancel an event (ADMIN).
>
> - Reserve a utility (MEMBER).
> - Create a utility booking (ADMIN).
> - Update a utility booking (ADMIN).
> - Delete a utility booking (ADMIN).
>
> - Sign up for a club (authenticated).
> - Login to a club (authnticated).
> - Apply for club membership (authenticated).
> - Approve a membership (ADMIN).
> - View member profile (MEMBER).
> - View all RSVP'd events (MEMBER).
> - View all club members (ADMIN).

## 5. User Stories/Scenarios

Elaborate use stories.

### Example

> ### Create a Run
> 
> Create a run that runners can join.
> 
> Suggested data:
> - brief description (e.g. "Saturday run along the river road.")
> - date and time (must be in the future)
> - a location (choose a level of difficulty from a single address field to a separately-tracked data entity)
> - running club identifier (runs are always attached to a club. If a runner belongs to more than one club, they may need to choose)
> - max participants (`null` for unlimited?)
> - a route (data from a map integration, if appropriate)
> 
> **Precondition**: User must be logged in with the MEMBER or ADMIN role.
> 
> **Post-condition**: If the user is a MEMBER, the run is not automatically posted. It must be approved by an ADMIN. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.
> 
> ### Edit a Run
> 
> Can only edit a run in the future.
> 
> **Precondition**: User must be logged in with the MEMBER or ADMIN role. Run datetime must be in the future.
> 
> **Post-condition**: If the user is a MEMBER, the run is set to a pending status even if it was initially posted. If the user is an ADMIN, they can choose to post it immediately or keep it in a pending status.
> 
> ### Cancel a Run
> 
> Can only cancel a run in the future.
> 
> **Precondition**: User must be logged in with the ADMIN role. Run datetime must be in the future.
> 
> **Post-condition**: Data is not deleted. The run is set to a canceled status and is no longer visible in the public UI. It *is* visible to the admin.
> 
> ### Approve a Run
> 
> Through an administrative UI, the ADMIN user finds pending runs for their club. They can choose to: post directly, edit and post, or cancel.
> 
> **Precondition**: User must be logged in with the ADMIN role.
> 
> **Post-condition**: None
> 
> ### Browse Runs
> 
> Decide how to display runs to anyone who uses the application.
> 
> - Text-based: Users filter by date and location. Display results as HTML with action UI to sign up.
> - Calendar-based: Users page through a calendar UI. Limit by location or manage the UI so there's not 200 runs on a single day.
> - Map-based: Users navigate to different locations to see future runs as pins on the map.
> 
> **Precondition**: None
> 
> **Post-condition**: None
> 
> ### Sign Up for a Run
> 
> Once a runner finds a run they're interested in, they can sign up.
> 
> **Precondition**: User must be logged in. The run must not be over-capacity. The runner cannot already be registered for the run.
> 
> **Post-condition**: Runner is registered for the run.
> 
> ### Apply for Membership (Optional)
> 
> If a runner enjoys a club's runs, they may wish to join the club. Give them an easy way to apply for membership.
> 
> **Precondition**: User must be logged in. The user cannot already be a member of the club.
> 
> **Post-condition**: Membership is in a pending status waiting for ADMIN approval.
> 
> ### Approve a Membership (Optional)
> 
> Through an administrative UI, the ADMIN user finds pending memberships for their club. They can choose to accept or reject the membership application.
> 
> **Precondition**: User must be logged in with the ADMIN role.
> 
> **Post-condition**: Data is not deleted. The membership is set to a rejected status. This prevents the runner from applying again and again.
