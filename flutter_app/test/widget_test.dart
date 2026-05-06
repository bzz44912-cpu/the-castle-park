import 'package:castle_park_app/main.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('App should build without errors', (WidgetTester tester) async {
    await tester.pumpWidget(const CastleParkApp());
    expect(find.text('THE CASTLE PARK'), findsOneWidget);
  });
}
