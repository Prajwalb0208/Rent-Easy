import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema(
  {
    typeOfHouse: { type: String, required: true },
    typeOfPayment: { type: String, required: true, enum: ['rent', 'lease'] },
    location: { type: String, required: true },
    rent: { type: Number, required: function() { return this.typeOfPayment === 'rent'; } },
    advance: { type: Number, required: function() { return this.typeOfPayment === 'rent'; } },
    lease: { type: Number, required: function() { return this.typeOfPayment === 'lease'; } },
    ownerMobile: { type: String, required: true },
    imageUrl: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    area: {
      type: String,
      required: true,
      enum: [
        'Nayandahalli', 'Hosakerehalli', 'Giri Nagar', 'Katriguppe', 'Vidya Peeta Ward',
        'Jayanagar East', 'JP Nagar', 'Sarakki', 'Shakambari Narar', 'Banashankari Temple Ward',
        'Kumara Swamy Layout', 'Padmanabha Nagar', 'Chikkala Sandra', 'Uttarahalli',
        'Yelchenahalli', 'Jaraganahalli', 'Puttenahalli', 'Gottigere', 'Konankunte',
        'Anjanapura', 'Vasanthpura'
      ]
    }
  },
  { timestamps: true }
);

const House = mongoose.model('House', houseSchema);

export default House;
