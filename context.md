# TradeMesh - Product Requirements & Design Specification

## Section 1: Authentication & Onboarding

### Registration Page

- **Data fields:** Full Name, Email, Password, Confirm Password.
- **Action:** Create Account.

### Login Page

- **Data fields:** Email, Password.
- **Action:** Login.

### 2FA Verification Page (Bonus I)

- **Data field:** One-Time Password (OTP) input (OTP sent to email).
- **Actions:** Verify OTP, Resend Code.

---

## Section 2: Main Marketplace (Buyer View)

### Home / Discovery Page

- **Data displayed:** User's current cash balance.
- **Inputs:** Search field (supports queries by Item Name and Brand).
- **Content (feed of available products):** Each product shows:
  - Image
  - Item Name
  - Brand
  - Price
  - Seller Name

### Product Details Page

- **Content:** Full product information:
  - Image
  - Name
  - Brand
  - Price
  - Seller Name
  - Full text Description
- **Action:** "Buy Now" (initiates purchase).
- **Bonus II (if user is owner of item):** Action to "Auto-generate Description/Image using AI".

### Checkout / Purchase Confirmation

- **Data displayed:**
  - Order summary (Item Name, Price)
  - User's current cash balance
- **Action:** Confirm Purchase.

---

## Section 3: User Account & Finances

### My Wallet Page

- **Data displayed:** User's current cash balance.
- **Inputs:** Amount to deposit.
- **Integration (Bonus III):** Real-life payment provider interface (e.g., Stripe) for processing deposit.
- **Action:** Deposit Cash.

### Transactions History Page

- **Content Area 1 (Purchases):** List of bought items showing:
  - Item
  - Price paid
  - Date
- **Content Area 2 (Sales):** List of sold items showing:
  - Item
  - Revenue earned
  - Date

---

## Section 4: Seller Tools & Integrations

### My Inventory Page

- **Content:** List of items listed for sale (not yet sold).
- **Actions per item:** Edit Item, Remove Item.
- **General Action:** Add New Item.

### Add / Edit Item Page

- **Inputs (Manual Entry):**
  - Item Name
  - Brand
  - Price
  - Description
- **Input (Bulk Entry - Bonus V):** File upload area for CSV file to create multiple products at once.
- **Action:** Save/List Item.

### Partner Store Portal (API Interface)

- **Data displayed:** User's active API Key.
- **Action:** Generate New API Key.
- **Content:** Documentation text + endpoint snippets (SOAP/REST) instructing external websites how to:
  - Fetch marketplace product list
  - Report purchases from their own sites

---

## Section 5: Analytics & Extra Features

### My Reports Page

- **Inputs:**
  - Date Range filter
  - Report Type filter (Sales, Purchases, Deposits)
- **Content:** Detailed log of user's personal transaction history based on selected filters, showing:
  - Date
  - Counterparty
  - Item
  - Money exchanged
- **Action:** Generate/Export Report.
