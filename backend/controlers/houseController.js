import House from '../models/House.js';

// Get all house listings
export const getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new house listing
export const createHouse = async (req, res) => {
  const { typeOfHouse, typeOfPayment, location, rent, advance, lease, ownerMobile, imageUrl, area } = req.body;
  const newHouse = new House({
    typeOfHouse,
    typeOfPayment,
    location,
    area,
    ownerMobile,
    imageUrl,
    status: 'Pending',
    ...(typeOfPayment === 'rent' ? { rent, advance } : { lease })
  });

  try {
    const savedHouse = await newHouse.save();
    res.status(201).json(savedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a house listing
export const updateHouse = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedHouse = await House.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json(updatedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Approve a house listing
export const approveHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const approvedHouse = await House.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!approvedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json(approvedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Reject a house listing
export const rejectHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const rejectedHouse = await House.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
    if (!rejectedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json(rejectedHouse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a house listing
export const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHouse = await House.findByIdAndDelete(id);
    if (!deletedHouse) {
      return res.status(404).json({ message: "House not found" });
    }
    res.json({ message: "House deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

