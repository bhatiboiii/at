# Aruna

A comprehensive management system for Todi, Gala, and Stone operations.

## Database Schema

### Collections Overview

| Collection | Slug | Primary Fields | Relationships |
|------------|------|----------------|---------------|
| Users | users | name, email, role | - |
| Vendor | vendor | vendor, vendor_no, address | - |
| Todi | todi | BlockType, l, b, h, todi_cost | vender_id, createdBy |
| Gala | gala | GalaType, l, front_b, back_b, total_b, h, gala_cost | vender_id, createdBy |
| Stone | stone | stoneType, rate, total_quantity | createdBy |
| TodiRaskat | todiraskat | BlockType, l, b, h, todi_cost | - |

### Relationships

1. **User Relationships**
   - Users → Todi (createdBy)
   - Users → Gala (createdBy)
   - Users → Stone (createdBy)

2. **Vendor Relationships**
   - Vendor → Todi (vender_id)
   - Vendor → Gala (vender_id)

3. **Block Relationships**
   - Todi → Group → Block → AddMeasures
   - Gala → Group → Block → AddMeasures
   - TodiRaskat → Group → Block → AddMeasures

### Collection Details

#### Users
- **Fields**:
  - id: serial (Primary Key)
  - name: varchar (required)
  - phone: varchar (nullable)
  - role: enum (admin/manager/user) - default: 'user'
  - updated_at: timestamp with timezone (required)
  - created_at: timestamp with timezone (required)
  - email: varchar (required, unique)
  - reset_password_token: varchar (nullable)
  - reset_password_expiration: timestamp with timezone (nullable)
  - salt: varchar (nullable)
  - hash: varchar (nullable)
  - login_attempts: numeric (nullable, default: 0)
  - lock_until: timestamp with timezone (nullable)
- **Access**:
  - Create: Admin only
  - Update: Admin only
  - Delete: Admin only
  - Read: Admin + Self
- **Indexes**:
  - users_created_at_idx: B-tree on created_at
  - users_email_idx: Unique B-tree on email
  - users_updated_at_idx: B-tree on updated_at

#### Vendor
- **Fields**:
  - id: serial (Primary Key)
  - address: varchar (nullable)
  - vendor: varchar (nullable)
  - vendor_no: varchar (nullable)
  - updated_at: timestamp with timezone (required)
  - created_at: timestamp with timezone (required)
- **Access**:
  - Admin and Manager only
- **Indexes**:
  - vendor_created_at_idx: B-tree on created_at
  - vendor_updated_at_idx: B-tree on updated_at

#### Todi
- **Fields**:
  - id: serial (Primary Key)
  - block_type: enum (Brown/White)
  - date: timestamp with timezone (nullable)
  - vender_id_id: integer (nullable, references vendor.id)
  - munim: varchar (nullable)
  - l: numeric (required)
  - b: numeric (nullable)
  - h: numeric (nullable)
  - todi_cost: numeric (nullable)
  - hydra_cost: numeric (nullable)
  - truck_cost: numeric (nullable)
  - total_todi_area: numeric (nullable)
  - total_todi_cost: numeric (nullable)
  - estimate_cost: numeric (nullable)
  - depreciation: numeric (nullable)
  - final_cost: numeric (nullable)
  - total_block_area: numeric (nullable)
  - total_block_cost: numeric (nullable)
  - party_remaining_payment: numeric (nullable)
  - created_by_id: integer (nullable, references users.id)
  - updated_at: timestamp with timezone (required)
  - created_at: timestamp with timezone (required)
- **Access**:
  - Create: Admin, Manager, User
  - Update: Admin, Manager
  - Delete: Admin
  - Read: Admin, Manager
- **Indexes**:
  - todi_created_at_idx: B-tree on created_at
  - todi_created_by_idx: B-tree on created_by_id
  - todi_updated_at_idx: B-tree on updated_at
  - todi_vender_id_idx: B-tree on vender_id_id
- **Foreign Keys**:
  - todi_created_by_id_users_id_fk: references users (id) on delete set null
  - todi_vender_id_id_vendor_id_fk: references vendor (id) on delete set null
- **Related Tables**:
  - **todi_delivered_block**
    - _order: integer (required)
    - _parent_id: integer (required, references todi.id)
    - id: varchar (Primary Key)
    - delivered_block_area: numeric (nullable)
    - delivered_block_cost: numeric (nullable)
    - date: timestamp with timezone (nullable)
    - description: varchar (nullable)
    - **Indexes**:
      - todi_delivered_block_order_idx: B-tree on _order
      - todi_delivered_block_parent_id_idx: B-tree on _parent_id
    - **Foreign Keys**:
      - todi_delivered_block_parent_id_fk: references todi (id) on delete CASCADE
  - **todi_group**
    - _order: integer (required)
    - _parent_id: integer (required, references todi.id)
    - id: varchar (Primary Key)
    - date: timestamp with timezone (nullable)
    - g_hydra_cost: numeric (nullable)
    - g_truck_cost: numeric (nullable)
    - g_total_cost: numeric (nullable)
    - g_total_block_area: numeric (nullable)
    - **Indexes**:
      - todi_group_order_idx: B-tree on _order
      - todi_group_parent_id_idx: B-tree on _parent_id
    - **Foreign Keys**:
      - todi_group_parent_id_fk: references todi (id) on delete CASCADE
    - **Related Tables**:
      - **todi_group_block**
        - _order: integer (required)
        - _parent_id: varchar (required, references todi_group.id)
        - id: varchar (Primary Key)
        - **Indexes**:
          - todi_group_block_order_idx: B-tree on _order
          - todi_group_block_parent_id_idx: B-tree on _parent_id
        - **Foreign Keys**:
          - todi_group_block_parent_id_fk: references todi_group (id) on delete CASCADE
        - **Related Tables**:
          - **todi_group_block_addmeasures**
            - _order: integer (required)
            - _parent_id: varchar (required, references todi_group_block.id)
            - id: varchar (Primary Key)
            - l: numeric (nullable)
            - b: numeric (nullable)
            - h: numeric (nullable)
            - block_area: numeric (nullable)
            - block_cost: numeric (nullable)
            - **Indexes**:
              - todi_group_block_addmeasures_order_idx: B-tree on _order
              - todi_group_block_addmeasures_parent_id_idx: B-tree on _parent_id
            - **Foreign Keys**:
              - todi_group_block_addmeasures_parent_id_fk: references todi_group_block (id) on delete CASCADE

#### TodiRaskat
- **Fields**:
  - id: serial (Primary Key)
  - block_type: enum (Brown/White)
  - date: timestamp with timezone (nullable)
  - vender_id_id: integer (nullable, references vendor.id)
  - munim: varchar (nullable)
  - l: numeric (required)
  - b: numeric (nullable)
  - h: numeric (nullable)
  - todi_cost: numeric (nullable)
  - hydra_cost: numeric (nullable)
  - truck_cost: numeric (nullable)
  - total_todi_area: numeric (nullable)
  - total_todi_cost: numeric (nullable)
  - estimate_cost: numeric (nullable)
  - depreciation: numeric (nullable)
  - final_cost: numeric (nullable)
  - total_block_area: numeric (nullable)
  - total_block_cost: numeric (nullable)
  - party_remaining_payment: numeric (nullable)
  - created_by_id: integer (nullable, references users.id)
  - updated_at: timestamp with timezone (required)
  - created_at: timestamp with timezone (required)
- **Access**:
  - Create: Admin, Manager, User
  - Update: Admin, Manager
  - Delete: Admin
  - Read: Admin, Manager, User
- **Indexes**:
  - todi_raskat_created_at_idx: B-tree on created_at
  - todi_raskat_created_by_idx: B-tree on created_by_id
  - todi_raskat_updated_at_idx: B-tree on updated_at
  - todi_raskat_vender_id_idx: B-tree on vender_id_id
- **Foreign Keys**:
  - todi_raskat_created_by_id_users_id_fk: references users (id) on delete set null
  - todi_raskat_vender_id_id_vendor_id_fk: references vendor (id) on delete set null
    - **Related Tables**:
      - **todi_group_block**
        - _order: integer (required)
        - _parent_id: varchar (required, references todi_group.id)
        - id: varchar (Primary Key)
        - **Indexes**:
          - todi_group_block_order_idx: B-tree on _order
          - todi_group_block_parent_id_idx: B-tree on _parent_id
        - **Foreign Keys**:
          - todi_group_block_parent_id_fk: references todi_group (id) on delete CASCADE
        - **Related Tables**:
          - **todi_group_block_addmeasures**
            - _order: integer (required)
            - _parent_id: varchar (required, references todi_group_block.id)
            - id: varchar (Primary Key)
            - l: numeric (nullable)
            - b: numeric (nullable)
            - h: numeric (nullable)
            - block_area: numeric (nullable)
            - block_cost: numeric (nullable)
            - **Indexes**:
              - todi_group_block_addmeasures_order_idx: B-tree on _order
              - todi_group_block_addmeasures_parent_id_idx: B-tree on _parent_id
            - **Foreign Keys**:
              - todi_group_block_addmeasures_parent_id_fk: references todi_group_block (id) on delete CASCADE

#### Gala
- **Fields**:
  - id: serial (Primary Key)
  - gala_type: enum (Brown/White)
  - date: timestamp with timezone (nullable)
  - vender_id_id: integer (nullable, references vendor.id)
  - munim: varchar (nullable)
  - l: numeric (required)
  - front_b: numeric (nullable)
  - back_b: numeric (nullable)
  - total_b: numeric (nullable)
  - h: numeric (nullable)
  - gala_cost: numeric (nullable)
  - hydra_cost: numeric (nullable)
  - truck_cost: numeric (nullable)
  - total_gala_area: numeric (nullable)
  - total_gala_cost: numeric (nullable)
  - estimate_cost: numeric (nullable)
  - depreciation: numeric (nullable)
  - final_cost: numeric (nullable)
  - total_block_area: numeric (nullable)
  - total_block_cost: numeric (nullable)
  - party_remaining_payment: numeric (nullable)
  - created_by_id: integer (nullable, references users.id)
  - updated_at: timestamp with timezone (required)
  - created_at: timestamp with timezone (required)
- **Access**:
  - Create: Admin, Manager, User
  - Update: Admin, Manager
  - Delete: Admin
  - Read: Admin, Manager, User
- **Indexes**:
  - gala_created_at_idx: B-tree on created_at
  - gala_created_by_idx: B-tree on created_by_id
  - gala_updated_at_idx: B-tree on updated_at
  - gala_vender_id_idx: B-tree on vender_id_id
- **Foreign Keys**:
  - gala_created_by_id_users_id_fk: references users (id) on delete set null
  - gala_vender_id_id_vendor_id_fk: references vendor (id) on delete set null
- **Related Tables**:
  - **gala_delivered_block**
    - _order: integer (required)
    - _parent_id: integer (required, references gala.id)
    - id: varchar (Primary Key)
    - delivered_block_area: numeric (nullable)
    - delivered_block_cost: numeric (nullable)
    - date: timestamp with timezone (nullable)
    - description: varchar (nullable)
    - **Indexes**:
      - gala_delivered_block_order_idx: B-tree on _order
      - gala_delivered_block_parent_id_idx: B-tree on _parent_id
    - **Foreign Keys**:
      - gala_delivered_block_parent_id_fk: references gala (id) on delete CASCADE
  - **gala_received_amount**
    - _order: integer (required)
    - _parent_id: integer (required, references gala.id)
    - id: varchar (Primary Key)
    - amount: numeric (required)
    - date: timestamp with timezone (required)
    - description: varchar (nullable)
    - **Indexes**:
      - gala_received_amount_order_idx: B-tree on _order
      - gala_received_amount_parent_id_idx: B-tree on _parent_id
    - **Foreign Keys**:
      - gala_received_amount_parent_id_fk: references gala (id) on delete CASCADE
  - **gala_group**
    - _order: integer (required)
    - _parent_id: integer (required, references gala.id)
    - id: varchar (Primary Key)
    - date: timestamp with timezone (nullable)
    - g_hydra_cost: numeric (nullable)
    - g_truck_cost: numeric (nullable)
    - g_total_block_area: numeric (nullable)
    - g_total_cost: numeric (nullable)
    - **Indexes**:
      - gala_group_order_idx: B-tree on _order
      - gala_group_parent_id_idx: B-tree on _parent_id
    - **Foreign Keys**:
      - gala_group_parent_id_fk: references gala (id) on delete CASCADE
    - **Related Tables**:
      - **gala_group_block**
        - _order: integer (required)
        - _parent_id: varchar (required, references gala_group.id)
        - id: varchar (Primary Key)
        - **Indexes**:
          - gala_group_block_order_idx: B-tree on _order
          - gala_group_block_parent_id_idx: B-tree on _parent_id
        - **Foreign Keys**:
          - gala_group_block_parent_id_fk: references gala_group (id) on delete CASCADE
        - **Related Tables**:
          - **gala_group_block_addmeasures**
            - _order: integer (required)
            - _parent_id: varchar (required, references gala_group_block.id)
            - id: varchar (Primary Key)
            - l: numeric (nullable)
            - b: numeric (nullable)
            - h: numeric (nullable)
            - block_area: numeric (nullable)
            - block_cost: numeric (nullable)
            - **Indexes**:
              - gala_group_block_addmeasures_order_idx: B-tree on _order
              - gala_group_block_addmeasures_parent_id_idx: B-tree on _parent_id
            - **Foreign Keys**:
              - gala_group_block_addmeasures_parent_id_fk: references gala_group_block (id) on delete CASCADE

#### Stone
- **Fields**:
  - stoneType: select (Khanda/Gudiya)
  - date: date
  - rate: number
  - total_quantity: number
  - issued_quantity: number
  - left_quantity: number
  - munim: text
  - hydra_cost: number
  - total_amount: number
  - createdBy: relationship
- **Access**:
  - Create: Admin, Manager, User
  - Update: Admin, Manager
  - Delete: Admin
  - Read: Admin, Manager, User

## Collections

### Todi
- **Fields**: BlockType, vender_id, todi_cost, total_area, munim, todirate, total_gala_area, total_block_area, total_block_cost, estimate_cost, depreciation, final_cost, group
- **Access**: 
  - Create: Admin, Manager, User
  - Update: Admin, Manager
  - Delete: Admin
  - Read: Admin, Manager
- **Hooks**: Calculates total_block_area, total_block_cost, and partyRemainingPayment

### Gala
- **Fields**: BlockType, vender_id, gala_cost, total_area, munim, total_gala_area, total_block_area, total_block_cost, estimate_cost, depreciation, final_cost, group
- **Access**: Similar to Todi
- **Hooks**: Similar calculations as Todi

### Stone
- **Fields**: stone_type, quantity, unit_price, total_price, vendor_id, date, status
- **Access**: Similar to Todi

### Vendor
- **Fields**: vendor, vendor_no, address
- **Access**: Admin, Manager

### Users
- **Fields**: name, email, role (admin/manager/user), password
- **Access**: Admin only

### TodiRaskat
- **Fields**: todi_id, raskat_date, quantity, rate, total_amount
- **Access**: Similar to Todi

## Folder Structure

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── accounts/          # User account management
│   │   ├── api/              # API endpoints
│   │   ├── block/            # Block management
│   │   │   ├── components/   # Reusable components
│   │   │   ├── gala/         # Gala related pages
│   │   │   │   ├── add/
│   │   │   │   ├── view/
│   │   │   └── todi/         # Todi related pages
│   │   │       ├── add/
│   │   │       └── view/
│   │   ├── components/       # Shared components
│   │   ├── dashboard/        # Dashboard pages
│   │   ├── login/           # Login page
│   │   ├── navbar/          # Navigation components
│   │   ├── stone/           # Stone management
│   │   └── vendor/          # Vendor management
│   ├── globals.css         # Global styles
│   └── layout.tsx          # App layout
├── collections/            # Database collections
│   ├── Todi.ts
│   ├── Gala.ts
│   ├── Stone.ts
│   ├── TodiRaskat.ts
│   ├── Users.ts
│   └── Vendor.ts
└── hooks/                 # Custom hooks
```

## Routing Structure

```
/ - Dashboard
/login - Login page
/block/todi/add - Add new Todi
/block/todi/view - View Todi
/block/gala/add - Add new Gala
/block/gala/view - View Gala
/stone - Stone management
/vendor - Vendor management
/accounts - Account management
```

## Features

### Dashboard
- Overview of all operations
- Quick access to main functionalities
- Summary statistics

### Block Management
- Add/Edit Todi blocks
- Add/Edit Gala blocks
- Calculate block areas and costs
- Manage vendor relationships

### Vendor Management
- Add/Edit vendors
- Track vendor transactions
- View vendor history

### User Management
- Role-based access control
- User authentication
- User roles: Admin, Manager, User

## Technologies Used
- Next.js
- TypeScript
- Payload CMS
- React
- Tailwind CSS

## Setup Instructions
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment variables
4. Run the development server: `npm run dev`
5. Access the application at `http://localhost:3000`

## Live Link
https://aruna.vercel.app/
#   a t  
 