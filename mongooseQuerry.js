// Basic Query Operators
// $eq: Matches values that are equal to a specified value.
// $ne: Matches values that are not equal to a specified value.
// $gt: Matches values that are greater than a specified value.
// $gte: Matches values that are greater than or equal to a specified value.
// $lt: Matches values that are less than a specified value.
// $lte: Matches values that are less than or equal to a specified value.
// $in: Matches any of the values specified in an array.
// $nin: Matches none of the values specified in an array.

// Logical Operators
// $or: Matches documents that satisfy at least one of the specified conditions.
// $and: Matches documents that satisfy all of the specified conditions.
// $not: Matches documents where the value of the field does not match the specified condition.
// $nor: Matches documents that do not satisfy any of the specified conditions.

// Element Operators
// $exists: Matches documents that contain a specified field.
// $type: Matches documents where the field is of a specified type.

// Evaluation Operators
// $regex: Matches documents where the field value matches a regular expression.
// $options: Specifies options for the regular expression (e.g., case-insensitive).

//  ((((((((((((((((((((((
// Common $options Values:
// "i": Case-insensitive matching
// "m": Multi-line matching (changes the behavior of ^ and $ to match the start and end of each line)
// "x": Extended mode (ignores whitespace and allows comments within the regex)
// "s": Dotall mode (allows . to match newline characters)
// "g": Global search (not directly supported in MongoDB, but relevant in some regex contexts))))))))))))))))))))))))))))))))))))

// Array Operators
// $all: Matches documents where the field contains all the elements specified in an array.
// $elemMatch: Matches documents that contain an array field with at least one element that matches all of the specified query criteria.
// $size: Matches documents where the field is an array with a specified number of elements.

// Geospatial Operators
// $geoWithin: Matches documents where a field contains geometries within a specified area.
// $geoIntersects: Matches documents where a field contains geometries that intersect with a specified area.
// $near: Matches documents with geometries near a specified point.

// Projection Operators
// $: Specifies which fields to include or exclude in the query results.
// Update Operators
// $set: Sets the value of a field.
// $unset: Removes a field from a document.
// $inc: Increments the value of a field.
// $mul: Multiplies the value of a field.
// $rename: Renames a field.
// $push: Adds an item to an array.
// $addToSet: Adds an item to an array only if it doesn't already exist.
// $pull: Removes items from an array.
// $pullAll: Removes all instances of the specified values from an array.

// Aggregation Operators
// $match: Filters documents to pass only those that match the specified condition.
// $group: Groups documents by a specified identifier and performs aggregation operations on the grouped documents.
// $sort: Sorts documents by specified fields.
// $project: Specifies the fields to include or exclude in the output documents.
// $limit: Limits the number of documents in the output.
// $skip: Skips a specified number of documents in the output

